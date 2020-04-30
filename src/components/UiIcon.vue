<template>
    <i
        :style="sizeOrDefault"
        class="ui-icon"
        v-on="$listeners"
        v-html="url"
    />
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component
    export default class UiIcon extends Vue {
        @Prop() icon!: boolean;
        @Prop() loading!: boolean;
        @Prop() size!: number;
        @Prop({ default: 'blue' }) color!: string;

        get url() {
            try {
                return require('!svg-inline-loader!@/assets/images/' + this.icon + '.svg');
            } catch (e) {
                console.log('No icon was found', e);
            }
        }

        get sizeOrDefault() {
            if (!this.size) return {};
            return { width: this.size + 'px', height: 'auto' };
        }
    }
</script>

<style lang="scss" scoped>
    @import '../assets/scss/imports';

    .ui-icon {
        box-sizing: content-box;
        display: inline-block;
        font-size: 0;
        overflow: hidden;
        transition: fill .3s ease;
    }
</style>
