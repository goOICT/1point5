<template>
    <section
        class="intro"
        :class="`active-${active}`"
    >
        <div
            v-if="getSlideActive(1)"
            class="slide-1"
        >
            <figure class="logo">
                <img
                    src="../assets/images/logo.svg"
                    alt="1point5"
                >
            </figure>
            <h1>Thank you for keeping distance</h1>

            <button
                class="ui-button"
                @click="next(2)"
            >
                Get started
            </button>
        </div>
        <div
            v-if="getSlideActive(2)"
            class="slide-2"
        >
            <p>
                To help you remind to keep distance we use the Bluetooth signal of your device.
                If another phone enters your surroundings we want to alert you to keep distance via a vibration.
            </p>
            <p>
                <strong>Please select a minimum distance</strong>
            </p>
            <UiDistance />
            <p class="no-track">
                <strong>We do not share, store or track your data in any way.</strong>
            </p>
            <button
                class="ui-button"
                @click="close"
            >
                Start monitoring
            </button>
        </div>
        <figure class="un-logo">
            <UiIcon
                icon="until-logo"
            />
        </figure>
    </section>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import UiDistance from '@/components/UiDistance.vue';
    import UiIcon from '@/components/UiIcon.vue';

    @Component({
        components: { UiIcon, UiDistance }
    })
    export default class UiIntro extends Vue {
        active = 1;

        getSlideActive(id: number) {
            return this.active === id;
        }

        next(id: number) {
            this.active = id;
        }

        close() {
            this.$store.commit('deviceStore/updateIntro', true);
        }
    }
</script>

<style scoped lang="scss">
    @import '../assets/scss/imports';

    .intro {
        z-index: 0;
        height: 100%;
        padding-top: 40px;
        background: white;
        text-align: center;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        &.active-2 {
            margin-top: 4 * $margin;
            border-radius: 50px 50px 0 0;
        }
    }

    .un-logo {
        text-align: center;
        width: 140px;
        margin: 0 auto 5 * $margin;

        @include breakpoint-down-value(321px) {
            margin: auto;
        }
    }

    h1 {
        width: 90%;
        color: $color-text-primary;
        font-size: 32px;
        @include ws-regular;
        margin: 2 * $margin auto;
        line-height: 44px;
    }

    p {
        font-size: 14px;
        @include ws-regular;
        width: 84%;
        margin: auto;

        strong {
            display: block;
            margin: 2 * $margin 0;
        }
    }

    .no-track {
        width: 90%;
        font-size: 10px;
        margin-top: 6 * $margin;
    }

    .logo {
        max-width: 160px;
        margin: auto;
    }

    .ui-button {
        margin-top: $margin;
    }

    .slide-1 {
        text-align: center;
    }

    .slide-2 {
        position: relative;
    }

</style>
