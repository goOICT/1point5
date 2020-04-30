<template>
    <div class="bluetooth">
        <h2>
            Your bluetooth is turned off
        </h2>
        <p>
            This app needs bluetooth to work, please enable it.
        </p>
        <div
            v-if="isAndroid"
            class="open-bluetooth"
            @click="enableBluetooth"
        >
            Enable bluetooth
        </div>
        <div
            v-else
            class="open-bluetooth"
            @click="enableBluetoothIos"
        >
            Go to settings
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class UiNoBluetooth extends Vue {
        rootHtml = document.getElementsByTagName('html')[0];

        created() {
            this.rootHtml.setAttribute('class', 'no-bluetooth');
        }

        beforeDestroy() {
            this.rootHtml.classList.remove('no-bluetooth');
        }

        get isAndroid() {
            return window.device.platform === 'Android';
        }

        enableBluetooth() {
            window.ble.enable(this.onResponse, this.onError);
        }

        enableBluetoothIos() {
            window.cordova.plugins.OpenAppSettings.open();
        }

        onResponse(r: any) {
            console.log(r);
        }

        onError(e: any) {
            console.log(e);
        }
    }
</script>

<style scoped lang="scss">
    @import '../assets/scss/imports';

    .bluetooth {
        display: flex;
        text-align: center;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        padding: 3 * $margin 2 * $margin;
    }

    h2 {
        color: $color-blue-0;
        @include ws-regular;
        max-width: 80%;
        line-height: 46px;
        font-size: 42px;

        @include breakpoint-down-value(321px) {
            max-width: 90%;
        }
    }

    p {
        color: $color-blue-0;
        margin: 3 * $margin;
    }

    .open-bluetooth {
        color: white;
        border-radius: 16px;
        background: $color-blue-0;
        padding: $margin 2 * $margin;
    }
</style>
