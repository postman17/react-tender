import {useStore} from "effector-react";
import {Checkbox} from "@material-ui/core";
import {Stack} from "@mui/material";
import {TENDER_STATUSES, setStatusFn, $statuses} from 'src/models/Tender/Filter';

const keysWithRemoveAction = Object.keys(TENDER_STATUSES).filter(key => TENDER_STATUSES[key].action === 'remove')
const isDisabled = (statuses, key) => {
    const removedFields = statuses.filter(item => keysWithRemoveAction.includes(item))
    if (removedFields.length !== 0) {
        if (removedFields.filter(item => TENDER_STATUSES[item].value.includes(key)).length !== 0) {
            return true
        }
    }
    return false
}


const Status = () => {
    const statuses = useStore($statuses)
    return (
        <Stack spacing={1}>
            {Object.entries(TENDER_STATUSES).map(([key, item], index) => (
                <label key={index}>
                    <Checkbox disabled={isDisabled(statuses, key)} checked={statuses.includes(key)} onChange={setStatusFn.prepend(_ => key)}/>
                    {item.key}
                </label>
            ))}
        </Stack>
    )
}

export {Status}