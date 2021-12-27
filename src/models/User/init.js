import {
    $userData,
    getCurrentUserDataFx
} from './index';


$userData.on(getCurrentUserDataFx.doneData, (_, data) => data);
