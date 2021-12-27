import {AppBar, Box, Button, Toolbar, Typography} from "@material-ui/core";
import Container from "@mui/material/Container";
import { logoutFn } from 'src/models/Auth';
import {$userFullName, $role, getCurrentUserDataFx} from 'src/models/User';
import {useStore} from "effector-react";
import {useEffect} from "react";


const NavBar = () => {
    useEffect(() => {
        getCurrentUserDataFx();
    }, [])
    const userData = useStore($userFullName);
    const role = useStore($role);
    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                    >
                        React Tender
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button
                            onClick={logoutFn}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Logout
                        </Button>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {role ? (
                            <Typography
                                variant="h6"
                                noWrap
                                component="div"
                                sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
                            >
                                {userData}. Role - {role}
                            </Typography>
                        ) : (
                            <></>
                        )}

                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export { NavBar }