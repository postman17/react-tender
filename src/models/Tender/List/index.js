import {appDomain} from 'src/models/App';
import {getTendersSign} from 'src/api/signatures/Tender';

export const TENDERS_ON_PAGE = 10;

export const $tendersResponse = appDomain.createStore([], {name: 'tendersResponse'});

export const $currentPage = appDomain.createStore(1, {name: 'currentPage'});

export const $tenders = $tendersResponse.map((item) => item.results);

export const getTendersFx = appDomain.createEffect(getTendersSign);


export const $tendersPagesCount = $tendersResponse.map(
    (item) => Math.ceil(item.count / TENDERS_ON_PAGE)
);


export const setCurrentPageFn = appDomain.createEvent('setCurrentPageFn');