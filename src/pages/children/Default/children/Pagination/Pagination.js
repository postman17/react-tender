import {useStore} from "effector-react";
import Pagination from '@mui/material/Pagination';
import {
    $tendersPagesCount, $currentPage,
    setCurrentPageFn
} from 'src/models/Tender';

const PaginationRow = () => {
    const pagesCount = useStore($tendersPagesCount)
    const currentPage = useStore($currentPage)
    return (
        <Pagination
            color="primary"
            page={currentPage}
            count={pagesCount}
            onChange={(e, page) => setCurrentPageFn(page)}
        />
    )
}

export {PaginationRow}
