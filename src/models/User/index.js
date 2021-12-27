import { appDomain } from 'src/models/App';
import {combine} from "effector";
import {getCurrentUserSign} from 'src/api/signatures/User';


export const $userData= appDomain.createStore('', { name: 'userData' });
export const $firstName = $userData.map(item => item.first_name)
export const $lastName = $userData.map(item => item.last_name)
export const $middleName = $userData.map(item => item.middle_name)
export const $role = $userData.map(item => item.role)

export const $userFullName = combine(
    $firstName, $lastName, $middleName,
    (firstName, lastName, middleName) => `${firstName} ${lastName} ${middleName}`
)

export const getCurrentUserDataFx = appDomain.createEffect(getCurrentUserSign);