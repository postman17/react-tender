import {AppBar, Box, Button, Toolbar, Typography} from "@material-ui/core";
import Container from "@mui/material/Container";
import { logoutFn } from 'src/models/Auth';

const NavBar = () => {
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
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export { NavBar }