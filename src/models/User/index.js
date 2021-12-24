import { appDomain } from 'src/models/App';
import {combine} from "effector";
import {getCurrentUserSign} from 'src/api/signatures/User';


export const $firstName = appDomain.createStore('', { name: 'firstName' });
export const $lastName = appDomain.createStore('', { name: 'lastName' });
export const $middleName = appDomain.createStore('', { name: 'middleName' });
export const $role = appDomain.createStore('', { name: 'role' });

export const $userFullName = combine(
    $firstName, $lastName, $middleName,
    (firstName, lastName, middleName) => `${firstName} ${lastName} ${middleName}`
)

export const getCurrentUserDataFx = appDomain.createEffect(getCurrentUserSign);