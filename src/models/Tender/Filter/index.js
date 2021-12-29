import {appDomain} from 'src/models/App';
import {combine} from "effector";


export const TENDER_STATUSES = {
    new: {key: 'Новый', value: 'new'},
    awaiting_requests: {key: 'Приём заявок', value: 'awaiting_requests'},
    voting: {key: 'Обработка заявок', value: 'voting'},
    final_voting: {key: 'Финальное голосование', value: 'final_voting'},
    canceled: {key: 'Отменен', value: 'canceled'},
    completed: {key: 'Завершен', value: 'completed'},
    not_archived: {key: 'Скрывать архивные тендеры', action: 'remove', value: ['completed', 'canceled']}
};

export const $tempSearch = appDomain.createStore('', {name: 'tempSearch'})

export const $search = appDomain.createStore('', {name: 'search'})
export const $statuses = appDomain.createStore([], {name: '$statuses'})
export const $typeOfWorksFilter =  appDomain.createStore([], {name: 'typeOfWorksFilter'})

export const $typeOfWorksFilterIds = $typeOfWorksFilter.map(typesOfWorks => {
    let ids = [];
    typesOfWorks.forEach(item => ids.push(item.id))
    return ids
})

export const $filters = combine(
    $search, $statuses, $typeOfWorksFilter,
    (search, statuses, typeOfWorks) => {
        return {
            search: search,
            status: statuses,
            types_of_works: typeOfWorks
        }
    })


export const setTempSearchFn = appDomain.createEvent('setTempSearchFn')
export const setSearchFn = appDomain.createEvent('setSearchFn')
export const setStatusFn = appDomain.createEvent('setSearchFn')
export const setTypeOfWorksFilterFn = appDomain.createEvent('setTypeOfWorksFilterFn')

export const resetFiltersFn = appDomain.createEvent('resetFilters')