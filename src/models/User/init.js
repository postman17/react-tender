import {forward, sample} from "effector";
import {spread} from "patronum/spread";
import {authorizeFx} from 'src/models/Auth';
import {
    $firstName, $lastName, $middleName, $role,
    getCurrentUserDataFx
} from './index';


forward({
    from: authorizeFx.done,
    to: getCurrentUserDataFx
})

sample({
    clock: getCurrentUserDataFx.doneData,
    target: spread({
        targets: {
            first_name: $firstName,
            middle_name: $middleName,
            last_name: $lastName,
            role: $role
        },
    })
})