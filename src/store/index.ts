import Vue from 'vue';
import Vuex from 'vuex';
import { deviceStore } from '@/store/modules/device.store';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        deviceStore
    },
    // @ts-ignore
    plugins: [createPersistedState()]
});
