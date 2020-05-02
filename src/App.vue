<template>
    <div id="app">
        <UiIntro
            v-if="!intro"
        />
        <div v-else>
            <transition name="fade">
                <Settings
                    v-if="$store.state.deviceStore.settings"
                    :bluetooth="bluetoothWasOff"
                />
            </transition>
            <UiNoBluetooth v-if="bluetoothWasOff" />
            <figure
                v-else
                class="distance-logo"
            >
                <img
                    v-if="!hasAlert"
                    src="./assets/images/thanks-for-keeping-distance.svg"
                    alt="Thanks!"
                >
                <img
                    v-else
                    src="./assets/images/keep-your-distance.svg"
                    alt="Thanks!"
                >
            </figure>
            <section class="wrapper">
                <Home />
                <div class="app-footer">
                    <figure class="un-logo">
                        <UiIcon
                            icon="until-logo"
                        />
                    </figure>
                    <div
                        class="button-settings"
                        @click="toggleSettings"
                    >
                        SETTINGS
                        <UiIcon
                            icon="settings"
                            size="12"
                        />
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Watch } from 'vue-property-decorator';
    import { namespace } from 'vuex-class';
    import UiIntro from '@/components/UiIntro.vue';
    import Home from '@/views/Home.vue';
    import Settings from '@/views/Settings.vue';
    import UiIcon from '@/components/UiIcon.vue';
    import UiNoBluetooth from '@/components/UiNoBluetooth.vue';

    declare global {
        interface Window {
            ble: any;
            cordova: any;
            bluetoothle: any;
            device: any;
            plugins: any;
            StatusBar: any;
        }
    }

    const deviceStore = namespace('deviceStore');

    @Component({
        components: { UiNoBluetooth, UiIcon, Settings, Home, UiIntro }
    })
    export default class App extends Vue {
        hasAlert = false;
        bluetoothWasOff = false;

        // For when start to advertise/scan with specific UUID
        serviceId = '0000FEAA-0000-1000-8000-00805F9B34FB';

        @deviceStore.Getter('excludes') excludes!: any;
        @deviceStore.Getter('devices') devices!: any;
        @deviceStore.Getter('mute') mute!: boolean;
        @deviceStore.Getter('intro') intro!: boolean;
        @deviceStore.Getter('vibration') vibration!: boolean;
        @deviceStore.Getter('deviceName') deviceName!: boolean;
        @deviceStore.Mutation('toggleSettings') toggleSettings!: void;

        created() {
            this.cleanDevices();
            document.addEventListener('deviceready', this.onDeviceReady, false);
            const html = document.documentElement;
            html.setAttribute('onsflag-iphonex-portrait', '');
        }

        onDeviceReady() {
            window.StatusBar.hide();
            if (this.intro) {
                window.ble.startStateNotifications(this.onInitializeBluetooth, this.onError);
            }

            // Check if there are devices nearby and trigger the alert
            setInterval(() => {
                this.setAlert();
            }, 2000);

            // Clear out of range devices
            setInterval(() => {
                this.cleanDevices();
            }, 10000);
        }

        cleanDevices() {
            this.$store.commit('deviceStore/cleanDevices');
        }

        setAlert() {
            if (!this.intro) return;
            this.hasAlert = false;
            this.devices.some((d: any) => {
                if (d.isDanger && !d.excluded) {
                    this.hasAlert = true;

                    if (!this.vibration) navigator.vibrate(200);
                    // @ts-ignore
                    if (!this.mute) navigator.notification.beep(1);
                }
                return d.isDanger && !d.excluded;
            });
        }

        collectDevices() {
            window.ble.startScanWithOptions([], { reportDuplicates: true }, this.onDiscoverDevice, this.onError);
        }

        filterDevices(device: any) {
            const devicesList = [
                'TV',
                'MacBook',
                '[AV] Samsung'
            ];
            return devicesList.some(d => {
                if (!device.name) return false;
                return device.name.indexOf(d) > -1;
            });
        }

        onDiscoverDevice(d: any) {
            if (this.filterDevices(d) || !this.shouldAlert(d.rssi)) return;

            const match = this.devices.find((e: any) => e.id === d.id);
            const distance = (d.rssi * -2.7).toFixed(2);
            const isDanger = this.shouldAlert(d.rssi);

            if (!match) {
                d.distance = distance;
                d.isDanger = isDanger;
                this.$store.commit('deviceStore/updateDevices', d);
            } else {
                match.rssi = d.rssi;
                match.distance = distance;
                match.isDanger = isDanger;
            }
        }

        shouldAlert(rssi: number) {
            const userSelectedDistance = this.$store.getters['deviceStore/distance'];
            let distance = -56;
            if (userSelectedDistance === 1) {
                distance = -77;
            }
            return rssi > distance;
        }

        isLocationOn() {
            window.ble.isLocationEnabled(this.onResponse,
                () => {
                    alert('Please enable location services');
                }
            );
        }

        onInitializeBluetooth(s: any) {
            if (s === 'off') {
                if (window.device.platform === 'Android') {
                    window.ble.enable(this.onResponse, this.onError);
                } else {
                    alert('Please enable bluetooth');
                }
                this.bluetoothWasOff = true;
                this.cleanDevices();
            }
            if (s === 'on') {
                this.bluetoothWasOff = false;
                this.isLocationOn();
                this.tryAdvertising();
                this.collectDevices();
            }
        }

        keepAdvertisingRunning(serviceParams: any) {
            console.log(serviceParams);
            if ((window.device.platform === 'Android')) {
                console.log('android');
                window.bluetoothle.initialize();

                window.bluetoothle.startAdvertising((r: any) => {
                    console.log('advertising: ', r);
                }, this.onError, serviceParams);
            } else {
                console.log('ios running');
                window.bluetoothle.initializePeripheral((r: any) => {
                    console.log('started: ', r);

                    window.bluetoothle.startAdvertising((r: any) => {
                        console.log('advertising: ', r);
                    }, this.onError, serviceParams);
                }, this.onError);
            }
        }

        tryAdvertising() {
            const serviceParams = {
                // services: [this.serviceId],
                // service: this.serviceId,
                name: `${window.device.platform} ${window.device.model}`,
                mode: 'balanced',
                txPowerLevel: 'high',
                connectable: false,
                includeDeviceName: true,
                timeout: 0
            };

            this.keepAdvertisingRunning(serviceParams);
        }

        onError(e: any) {
            console.log('Error trying to get device', e);
        }

        onResponse(r?: any): any {
            console.log(r);
        }

        @Watch('intro')
        onIntroStatusChange() {
            window.ble.startStateNotifications(this.onInitializeBluetooth, this.onError);
        }

        @Watch('hasAlert')
        onHasAlertChange(v: boolean) {
            const root = document.getElementsByTagName('html')[0];
            v ? root.classList.add('has-alert') : root.classList.remove('has-alert');
        }
    }
</script>

<style lang="scss">
    @import './assets/scss/imports';

    .wrapper {
        left: 0;
        right: 0;
        bottom: 0;
        position: absolute;
        display: flex;
        flex-direction: column;
        margin-top: 6 * $margin;
        background: white;
        box-shadow: 0 -4px 20px 0 rgba(0, 0, 0, 0.15);
        border-radius: 60px 60px 0 0;
    }

    .app-footer {
        display: flex;
        flex-direction: row;
        padding: $margin 4 * $margin 2* $margin;
        justify-content: space-between;
        align-items: center;
    }

    .un-logo {
        fill: $color-blue-1;
        width: 130px;

        i {
            width: 100% !important;
        }

        @include breakpoint-down-value(321px) {
            width: 100px;
        }
    }

    .button-settings {
        @include ws-medium;
        color: $color-blue-1;
        font-weight: 700;
        height: 30px;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);

        .ui-icon {
            margin-left: $margin/2;
            stroke: $color-blue-1;
        }
    }

    .distance-logo {
        user-select: none;
        padding-top: 5 * $margin;
        display: flex;
        align-items: center;
        align-content: center;
        justify-content: center;
        -webkit-appearance: none;
        border-radius: 0;

        img {
            width: 200px;
        }

        @include breakpoint-down-value(321px) {
            padding-top: 3* $margin;
        }
    }
</style>
