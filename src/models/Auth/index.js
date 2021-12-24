import {combine, createEvent, createEffect} from "effector";
import { createForm } from 'effector-forms';
import { isNotEmptyString, isEmail } from 'src/lib/form';
import { LSKeys, safeLocalStorage } from 'src/helpers/localStorage';
import { authLoginSign } from 'src/api/signatures/Auth';
import { appDomain } from 'src/models/App';

export const $tokenData = appDomain.createStore({
    accessToken: safeLocalStorage.getItem(LSKeys.ACCESS_TOKEN),
    refreshToken: safeLocalStorage.getItem(LSKeys.REFRESH_TOKEN),
}, { name: 'token' });

export const $isAuthenticated = $tokenData.map(
    ({ accessToken, refreshToken }) => isNotEmptyString(accessToken) || isNotEmptyString(refreshToken),
);

export const $login = appDomain.createStore('', { name: 'login' });
export const $password = appDomain.createStore('', { name: 'password' });

export const $isLoginFormValid = combine(
    $login, $password,
    (login, password) => (isNotEmptyString(password) && isEmail(login))
);

export const logoutFn = createEvent('logoutFn')
export const authorizeFn = createEvent('authorizeFn')

export const authorizeFx = createEffect(authLoginSign);


const rules = {
    required: () => ({
        name: "required",
        validator: value => ({
            isValid: isNotEmptyString(value),
            errorText: "This field is required",
        }),
    }),
    email: () => ({
        name: "email",
        validator: value => ({
                isValid: isEmail(value),
                errorText: "Enter email",
        })
    })
}

export const loginForm = createForm({
    fields: {
        login: {
            rules: [
                rules.required(),
                rules.email(),
            ],
            units: { $value: $login }
        },
        password: {
            rules: [
                rules.required()
            ],
            units: { $value: $password }
        },
    },
    validateOn: ['submit', 'blur'],
    units: {
        submit: authorizeFn
    },
});
