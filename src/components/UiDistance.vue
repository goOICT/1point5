<template>
    <div class="distance">
        <b-field :label="calculatedDistance">
            <b-slider
                v-model="distance"
                size="is-large"
                :min="0"
                :max="1"
                :tooltip="false"
            >
                <b-slider-tick :value="0">
                    1.5
                </b-slider-tick>
                <b-slider-tick :value="1">
                    2.0
                </b-slider-tick>
            </b-slider>
        </b-field>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class UiDistance extends Vue {
        get distance() {
            return this.$store.getters['deviceStore/distance'];
        }

        set distance(v: number) {
            this.$store.commit('deviceStore/updateDistance', v);
        }

        get calculatedDistance() {
            let distance = 0;
            if (this.distance === 0) {
                distance = 1.5;
            }
            if (this.distance === 1) {
                distance = 2.0;
            }
            return `${distance} meters`;
        }
    }
</script>

<style lang="scss" scoped>
    @import '../assets/scss/imports';

    .distance {
        width: 150px;
        margin: auto;
    }

    /deep/ .b-slider {
        @include ws-regular;

        .label {
            @include ws-medium;
            color: $color-blue-1;
        }

        .b-slider-tick-label {
            margin-top: 16px;
        }

        .b-slider-thumb-wrapper .b-slider-thumb {
            background: $color-blue-1;
        }
    }
</style>
