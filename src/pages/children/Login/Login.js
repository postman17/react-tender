import {useStore} from "effector-react";
import {useForm} from "effector-forms";
import {Button, Grid, TextField} from "@mui/material";
import {$isLoginFormValid, loginForm} from "src/models/Auth";


const Login = () => {
    const { submit, fields, hasError, errorText } = useForm(loginForm)
    const isLoginFormValid = useStore($isLoginFormValid);
    const onSubmit = (e) => {
        e.preventDefault()
        submit()
    }
    return (
        <form onSubmit={onSubmit}>
            <Grid container direction="column" alignItems="center" justify="center" sx={{ marginTop: 5 }} spacing={2}>
                <Grid item style={{ width: '70%'}}>
                    <TextField
                        value={fields.login.value}
                        error={hasError("login")}
                        onBlur={() => fields.login.onBlur()}
                        onChange={(e) => fields.login.onChange(e.target.value)}
                        id="outlined-basic"
                        label="Login"
                        style={{width: '100%'}}
                        helperText={errorText("login")}
                    />
                </Grid>
                <Grid item style={{ width: '70%'}}>
                    <TextField
                        type="password"
                        value={fields.password.value}
                        error={hasError("password")}
                        onBlur={() => fields.password.onBlur()}
                        onChange={(e) => fields.password.onChange(e.target.value)}
                        id="outlined-basic"
                        label="Password"
                        style ={{width: '100%'}}
                        helperText={errorText("password")}
                    />
                </Grid>
                <Grid item style={{ width: '70%'}}>
                    <Button disabled={!isLoginFormValid} type="submit" size="small">Login</Button>
                </Grid>
            </Grid>
        </form>
    )
}

export { Login }