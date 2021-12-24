import {useStore} from "effector-react";
import {$userFullName, $role} from 'src/models/User';


const Default = () => {
    const userData = useStore($userFullName);
    const role = useStore($role);
    return (
        <>
            <h1>Hello - {userData}</h1>
            <h2>Role - {role}</h2>
        </>
    )
}

export { Default }