import Container  from '@mui/material/Container';
import {Box, Fade} from "@mui/material";
import {useGate} from "effector-react";
import {useHistory} from 'react-router-dom';
import { RouterGate } from 'src/models/App';
import { useSnackbar } from 'notistack';
import { NavBar } from './children/NavBar/NavBar';


const AuthorizedLayout = ({ children }) => {
    const { enqueueSnackbar } = useSnackbar();
    const pathname = window.location.pathname;
    const history = useHistory();
    useGate(RouterGate, { enqueueSnackbar, history, pathname });
    return (
        <Container component="main">
            <NavBar />
            <Fade in>
                <Box py={3.5}>{children}</Box>
            </Fade>
        </Container>
    )
}

export { AuthorizedLayout }