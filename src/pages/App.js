import {BrowserRouter, Redirect, Switch} from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { BasicRoute as Route, PrivateRoute } from 'src/pages/Routes';
import { Login } from 'src/pages/children/Login/Login';
import { Default } from 'src/pages/children/Default/Default';


const App = () => (
        <BrowserRouter>
            <SnackbarProvider>
                <Switch>
                    <Route path="/login" component={Login} exact />
                    <PrivateRoute path="/default" component={Default} />
                    <Redirect from="/" to="/login" exact />
                </Switch>
            </SnackbarProvider>
        </BrowserRouter>
    );

export default App;
