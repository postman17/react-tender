import {useStore} from "effector-react";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import {$tempSearch, setTempSearchFn, setSearchFn} from 'src/models/Tender/Filter';


const Search = () => {
    const search = useStore($tempSearch)
    return (
        <>
            <InputBase
                value={search}
                sx={{ml: 1, flex: 1}}
                placeholder="Search task"
                onChange={setTempSearchFn.prepend(e => e.target.value)}
            />
            <IconButton
                type="submit"
                sx={{p: '10px'}}
                aria-label="search"
                onClick={setSearchFn.prepend(_ => search)}
            >
                <SearchIcon/>
            </IconButton>
        </>
    )
}

export {Search}