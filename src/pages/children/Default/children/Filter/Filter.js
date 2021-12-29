import Paper from '@mui/material/Paper';
import {Button, Divider} from '@material-ui/core';
import { Clear } from '@material-ui/icons';
import Box from '@mui/material/Box';
import {resetFiltersFn} from 'src/models/Tender/Filter';
import {Search} from './children/Search/Search';
import {Status} from './children/Status/Status';
import {TypeOfWork} from './children/TypeOfWork/TypeOfWork';


const Filter = () => {
    return (
        <Paper style={{ width: '280px', padding: 11}}>
            <Search />
            <Divider />
            <Status />
            <Divider />
            <TypeOfWork />
            <Divider />
            <Box sx={{ p: 1 }}>
                <Button
                    variant="text"
                    size="small"
                    startIcon={<Clear />}
                    onClick={resetFiltersFn}
                    // disabled={!isExistDataFilter}
                >
                    Сбросить фильтры
                </Button>
            </Box>
        </Paper>
    )
}

export { Filter }