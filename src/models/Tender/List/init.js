import {sample} from "effector";
import {
    TENDER_STATUSES,
    $filters,
    resetFiltersFn, setSearchFn, setStatusFn,
    setTypeOfWorksFilterFn
} from 'src/models/Tender/Filter';
import {
    TENDERS_ON_PAGE,
    $tendersResponse, $currentPage,
    setCurrentPageFn,
    getTendersFx
} from './index';


$tendersResponse.on(getTendersFx.doneData, (_, result) => result);
$currentPage
    .on(setCurrentPageFn, (_, value) => value)
    .reset(resetFiltersFn)


sample({
    clock: $filters,
    fn: () => 1,
    target: $currentPage
})


sample({
    clock: [setCurrentPageFn, setSearchFn, setStatusFn, setTypeOfWorksFilterFn, resetFiltersFn],
    source: [$currentPage, $filters],
    fn: ([currentPage, filters], _) => {
        let newFilters = {...filters}
        if (filters.status) {
            let statuses = [];
            filters.status.forEach(status => {
                if (TENDER_STATUSES[status].action !== 'remove') {
                    statuses.push(TENDER_STATUSES[status].value)
                }
            })
            newFilters.status = statuses.join(',');
        }
        if (filters.types_of_works) {
            let typesOfWorks = [];
            filters.types_of_works.forEach(item => typesOfWorks.push(item.name))
            newFilters.types_of_works = typesOfWorks
        }
        return ({
            offset: ((currentPage - 1) * TENDERS_ON_PAGE),
            limit: TENDERS_ON_PAGE,
            ...newFilters
        })
    },
    target: getTendersFx,
});
