import {sample} from "effector";
import {spread} from "patronum/spread";
import {
    appDomain,
    RouterGate,
    $pathname, $history, $enqueueSnackbar,
    pushHistoryFx,
    pushHistoryFn, resetStatesFn, notifySuccessFn,
    notifyErrorFn
} from './index'


appDomain.onCreateStore((store) => {
  store.reset(resetStatesFn);
});


sample({
    clock: RouterGate.state,
    target: spread({
        targets: {
            pathname: $pathname,
            history: $history,
            enqueueSnackbar: $enqueueSnackbar,
        },
    }),
});

$enqueueSnackbar
    .on(notifySuccessFn, (notify, message) => {
        notify(message, { variant: 'success' });
    })
    .on(notifyErrorFn, (notify, message) => {
        notify(message, { variant: 'error' });
    });

pushHistoryFx.use(({ history, path }) => history.push(path));

sample({
    clock: pushHistoryFn,
    source: $history,
    fn: (history, path) => ({history, path}),
    target: pushHistoryFx
})
