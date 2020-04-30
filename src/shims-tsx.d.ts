// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Vue, { VNode } from 'vue/types/umd';

declare global {
    namespace JSX {
        // tslint:disable no-empty-interface
        interface Element extends VNode {
        }

        // tslint:disable no-empty-interface
        interface ElementClass extends Vue {
        }

        interface IntrinsicElements {
            [elem: string]: any;
        }
    }
}
