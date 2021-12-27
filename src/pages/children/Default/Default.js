import {useEffect} from "react";
import {useStore} from "effector-react";
import {CircularProgress, Grid} from "@material-ui/core";
import {Stack} from "@mui/material";
import Container from "@mui/material/Container";
import {$tenders, setCurrentPageFn} from 'src/models/Tender';
import {PaginationRow} from './children/Pagination/Pagination';
import {Tender} from './children/Tender/Tender';


const Default = () => {
    useEffect(() => {
        setCurrentPageFn();
    }, [])
    const tenders = useStore($tenders);
    if (!tenders) {
        return (
            <CircularProgress />
        )
    }
    return (
        <Container maxWidth="xl">
            <Grid container direction="column" alignItems="center" justify="center" sx={{ marginTop: 5 }} spacing={2}>
                <Stack spacing={1}>
                    {tenders.map((item, index)=>{
                        return (
                            <Grid item style={{ width: '70%'}} key={index}>
                                <Tender {...item}/>
                            </Grid>
                        )
                    })}
                    <PaginationRow />
                </Stack>
            </Grid>
        </Container>
    )
}

export { Default }