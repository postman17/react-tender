import {createDomain, createStore, createEvent} from "effector";
import {createGate} from "effector-react";


export const appDomain = createDomain('App');

export const RouterGate = createGate('App');
export const $pathname = appDomain.createStore('', { name: 'pathname' });
export const $history = appDomain.createStore({}, { name: 'history' });
export const $enqueueSnackbar = createStore({}, { name: 'enqueueSnackbar ' });
export const notifySuccessFn = createEvent('notifySuccess');
export const notifyErrorFn = createEvent('notifyError');

export const pushHistoryFn = appDomain.createEvent('pushHistoryFn');

export const resetStatesFn = appDomain.createEvent('resetStatesFn');

export const pushHistoryFx = appDomain.createEffect('pushHistoryFx');
