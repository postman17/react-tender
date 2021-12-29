import {
    TENDER_STATUSES,
    $tempSearch, $statuses, $search, $typeOfWorksFilter,
    setTempSearchFn, resetFiltersFn, setSearchFn, setStatusFn,
    setTypeOfWorksFilterFn
} from './index';


$tempSearch
    .on(setTempSearchFn, (_, value) => value)
    .reset(resetFiltersFn)

$search
    .on(setSearchFn, (_, value) => value)
    .reset(resetFiltersFn)

$statuses
    .on(setStatusFn, (state, value) => {
        let newState = [...state];
        if (TENDER_STATUSES[value].action === 'remove') {
            if (state.includes(value)) {
                newState = newState.filter(item => (item !== value))
            } else {
                newState = newState.filter(item => !TENDER_STATUSES[value].value.includes(item))
                newState.push(value)
            }
        } else {
            if (state.includes(value)) {
                newState = newState.filter(item => (item !== value))
            } else {
                newState.push(value)
            }
        }
        return newState
    })
    .reset(resetFiltersFn)


$typeOfWorksFilter
    .on(setTypeOfWorksFilterFn, (state, values) => values)
    .reset(resetFiltersFn)