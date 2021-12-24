import {forward, sample} from "effector";
import {LSKeys, safeLocalStorage} from "src/helpers/localStorage";
import {pushHistoryFn, resetStatesFn, notifyErrorFn} from "src/models/App";
import {
    $login, $password, $tokenData,
    authorizeFn, logoutFn, authorizeFx,
} from "./index";


$tokenData
  .on(authorizeFx.doneData, (_, result) => {
    safeLocalStorage.setItem(LSKeys.ACCESS_TOKEN, result.access);
    safeLocalStorage.setItem(LSKeys.REFRESH_TOKEN, result.refresh);
    return ({ accessToken: result.access, refreshToken: result.refresh, path: '/default' });
  })
  .on(resetStatesFn, () => {
    safeLocalStorage.clear();
    return { accessToken: '', refreshToken: '' };
  });


forward({
    from: logoutFn,
    to: [
        resetStatesFn,
        pushHistoryFn.prepend(() => '/login'),
    ],
});

sample({
    clock: authorizeFn,
    source: [$login, $password],
    fn: ([login, password], _) => ({email: login, password}),
    target: authorizeFx
})

forward({
  from: authorizeFx.fail,
  to: notifyErrorFn.prepend(
      (item) => (item.error.response.data.errors.non_field_errors[0])
    )
});


