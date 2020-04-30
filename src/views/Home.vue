<template>
    <div class="home">
        <div class="device-list-wrapper">
            <div v-if="notExcludedDevices.length === 0">
                <h2>NOBODY AROUND</h2>
            </div>
            <div v-else>
                <h2>
                    NEARBY DEVICES
                </h2>
                <ul class="device-list">
                    <li
                        v-for="(device) in notExcludedDevices"
                        :key="device.id"
                    >
                        <UiIcon
                            icon="device"
                            size="40"
                        />
                        <div class="user">
                            <span class="name">
                                {{ device.name || 'Unknown device' }}
                            </span>
                        </div>

                        <UiIcon
                            class="user-action-icon"
                            icon="exclude"
                            @click="exclude(device)"
                        />
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import UiIcon from '@/components/UiIcon.vue';
    import { namespace } from 'vuex-class';

    const deviceStore = namespace('deviceStore');
    @Component({
        components: { UiIcon }
    })
    export default class Home extends Vue {
        @deviceStore.Getter('devices') devices!: any;
        @deviceStore.Getter('devicesMock') devicesMock!: any;

        get notExcludedDevices() {
            if (!this.devices) return [];
            return this.devices.filter((d: any) => (!d.excluded));
        }

        exclude(device: any) {
            device.excluded = true;
            this.$store.commit('deviceStore/updateDevice', device);
        }

        add(device: any) {
            device.excluded = false;
            this.$store.commit('deviceStore/updateDevice', device);
        }
    }
</script>

<style lang="scss" scoped>
    @import '../assets/scss/imports';

    .home {
        position: relative;
        text-align: center;
        padding-top: 2 *  $margin;
    }

    h2 {
        color: $color-blue-2;
        @include ws-medium;
        margin: $margin / 2 0;
    }

    .user-action-icon {
        /deep/ svg {
            width: 22px;
        }
    }
</style>
