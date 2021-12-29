import {forward} from "effector";
import {$typeOfWorks, getTypeOfWorksFn, getTypeOfWorksFx} from "./index";


$typeOfWorks.on(getTypeOfWorksFx.doneData, (_, {results}) => results)


forward({
    from: getTypeOfWorksFn,
    to: getTypeOfWorksFx
})