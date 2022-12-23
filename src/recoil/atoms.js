import { atom } from 'recoil';

export const room = atom({
    key: "room",
    default: []
});

export const host = atom({
    key: "host",
    default: []
});

export const playerName = atom({
    key: "playerName",
    default: []
});

