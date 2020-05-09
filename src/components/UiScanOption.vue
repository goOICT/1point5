<template>
    <div class="scan-option">
        <h2>
            Select your choice
            <span>
                You can always change that later
            </span>
        </h2>
        <ul>
            <li
                @click="enable"
                :class="{'is-enabled': $store.state.deviceStore.scanAllDevices}"
            >
                <div class="icon">
                    <UiIcon icon="vibration-off" />
                </div>
                All devices
            </li>
            <li
                @click="disable"
                :class="{'is-enabled': !$store.state.deviceStore.scanAllDevices}"
            >
                <div class="icon">
                    <UiIcon icon="logo" />
                </div>
                Only 1point5
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import UiIcon from '@/components/UiIcon.vue';

    @Component({
        components: { UiIcon }
    })
    export default class UiScanOption extends Vue {
        enable() {
            this.$store.commit('deviceStore/updateScanAllDevices', true);
        }

        disable() {
            this.$store.commit('deviceStore/updateScanAllDevices', false);
        }
    }
</script>

<style lang="scss" scoped>
    @import '../assets/scss/imports';

    .scan-option {
        margin-top: 2 * $margin;
    }

    h2 {
        color: $color-blue;
        @include ws-medium;

        span {
            display: block;
            font-size: 12px;
        }
    }

    ul {
        margin: $margin auto 0;
        max-width: 50%;
        display: flex;
        justify-content: space-between;
    }

    li {
        margin-top: $margin;
        font-size: 12px;
        display: flex;
        flex-direction: column;
        align-items: center;
        @include ws-regular;

        .icon {
            width: 56px;
            height: 56px;
            border: 1px solid $color-blue-4;
            border-radius: 14px;
            margin-bottom: $margin /2;
        }

        .ui-icon {
            transform: scale(1.4);
        }

        &:first-child {
            /deep/ .ui-icon {
                stroke: red;
            }
        }
    }

    .is-enabled {
        color: $color-blue-1;
        .icon {
            border: 3px solid $color-blue-1;
        }
    }

</style>
