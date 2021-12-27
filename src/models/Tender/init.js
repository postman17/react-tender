import {sample} from "effector";
import {
    TENDERS_ON_PAGE,
    $tendersResponse, $currentPage,
    setCurrentPageFn,
    getTendersFx
} from './index';


$tendersResponse.on(getTendersFx.doneData, (_, result) => result);
$currentPage.on(setCurrentPageFn, (_, value) => value);


sample({
    clock: setCurrentPageFn,
    source: $currentPage,
    fn: (currentPage) => ({
        offset: ((currentPage - 1) * TENDERS_ON_PAGE),
        limit: TENDERS_ON_PAGE,
    }),
    target: getTendersFx,
});
