import { ActionTree, GetterTree, Module, MutationTree } from 'vuex';

const devicesMock = [
    {
        rssi: -60,
        distance: 145,
        isDanger: true,
        name: ''
    },
    {
        rssi: -60,
        distance: 145,
        isDanger: true,
        name: 'Moto e6'
    },
    {
        rssi: -60,
        distance: 145,
        isDanger: true,
        name: 'Moto e6'
    },
    {
        rssi: -60,
        distance: 145,
        isDanger: true,
        name: 'Moto e6'
    },
    {
        rssi: -60,
        distance: 145,
        isDanger: true,
        name: 'Moto e6'
    },
    {
        rssi: -60,
        distance: 145,
        isDanger: true,
        name: 'Moto e6'
    },
    {
        rssi: -60,
        distance: 145,
        isDanger: true,
        name: 'Moto e6'
    },
    {
        rssi: -60,
        distance: 145,
        isDanger: true,
        name: 'Moto e6'
    }
];

export const state: any = {
    devices: [],
    mute: false,
    distance: undefined,
    intro: false,
    settings: false,
    vibration: false,
    devicesMock: devicesMock
};

const getters: GetterTree<any, any> = {
    devices: state => state.devices,
    devicesMock: state => state.devicesMock,
    excludes: state => state.devices.filter((d: any) => d.excluded),
    mute: state => state.mute,
    distance: state => state.distance,
    intro: state => state.intro,
    vibration: state => state.vibration
};

const mutations: MutationTree<any> = {
    updateIntro(state, v) {
        state.intro = v;
    },
    updateDistance(state, v) {
        state.distance = v;
    },
    toggleMute(state, v) {
        state.mute = !state.mute;
    },
    updateDevices(state, v) {
        state.devices.push(v);
    },
    updateDevice(state, device) {
        state.devices = [
            ...state.devices.filter((e: any) => e.id !== device.id),
            device
        ];
    },
    removeDevice(state, device) {
        state.devices = [
            ...state.devices.filter((e: any) => e.id !== device.id)
        ];
    },
    cleanDevices(state) {
        state.devices = [
            ...state.devices.filter((e: any) => e.excluded)
        ];
    },
    toggleSettings(state) {
        state.settings = !state.settings;
    },
    toggleVibration(state) {
        state.vibration = !state.vibration;
    }
};

const actions: ActionTree<any, any> = {};

export const deviceStore: Module<any, any> = {
    state,
    actions,
    getters,
    mutations,
    namespaced: true
};
