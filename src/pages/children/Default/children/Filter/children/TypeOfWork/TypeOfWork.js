import {useStore} from "effector-react";
import Box from '@mui/material/Box';
import {Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select} from "@material-ui/core";
import {$typeOfWorksArray} from 'src/models/TypeOfWork';
import {
    $typeOfWorksFilter, $typeOfWorksFilterIds,
    setTypeOfWorksFilterFn
} from 'src/models/Tender/Filter';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            maxWidth: 468,
            width: '100%'
        },
    },
    // Fix for the bug: https://github.com/mui-org/material-ui/issues/19245
    getContentAnchorEl: null,
};
const renderValue = (selectedValues) => `Выбрано работ: ${selectedValues.length}`;

const handleSelectChange = (sortedTypeOfWorks, selectedTypeOfWorks) => (event) => {
    const isWorksExists = (targetArray, targetId) => (targetArray.filter(item => item.categoryId === targetId).length !== 0)
    const isCategoryExist = (targetArray, targetId) => (targetArray.filter(record => record.id === targetId).length !== 0)

    const additionalValues = event.target.value;
    let result = [];
    let preResult = []
    additionalValues.forEach(item => {
        if (!(additionalValues.filter(record => record.id === item.id).length > 1)) {
            preResult.push(item)
            if (item.category && !selectedTypeOfWorks.includes(item)) {
                sortedTypeOfWorks.filter(record => record.categoryId === item.id).forEach(item => {
                    if (!additionalValues.includes(item)) {
                        preResult.push(item)
                    }
                })
            } else if (!item.category && !isCategoryExist(additionalValues, item.categoryId) && !isCategoryExist(selectedTypeOfWorks, item.categoryId)) {
                preResult.push(sortedTypeOfWorks.find(obj => obj.id === item.categoryId))
            }
        }
    })
    preResult.forEach(item => {
        if (item.category && (isWorksExists(preResult, item.id) || !isWorksExists(sortedTypeOfWorks, item.id))) {
            result.push(item)
        } else if (!item.category && isCategoryExist(preResult, item.categoryId)) {
            result.push(item)
        }
    })
    setTypeOfWorksFilterFn(result);
}
const stylesForCheckBox = (bool) => bool ? {} : ({ paddingLeft: '32px' })


export const TypeOfWork = () => {
    const typeOfWorks = useStore($typeOfWorksArray)
    const selectedTypesOfWorks = useStore($typeOfWorksFilter)
    const selectedIds = useStore($typeOfWorksFilterIds)
    return (
        <Box sx={{ p: 1 }}>
            <FormControl variant="outlined" fullWidth>
                <InputLabel htmlFor="type-of-works">Виды работ</InputLabel>
                <Select
                    multiple
                    value={selectedTypesOfWorks}
                    label="Виды работ"
                    renderValue={renderValue}
                    MenuProps={MenuProps}
                    onChange={handleSelectChange(typeOfWorks, selectedTypesOfWorks)}
                >
                    {typeOfWorks.map((typeOfWork, index) => {
                        const isChecked = selectedIds.includes(typeOfWork.id)
                        return (
                            <MenuItem key={typeOfWork.id} value={typeOfWork}>
                                <Checkbox color="primary" checked={isChecked} style={stylesForCheckBox(typeOfWork.category)} />
                                <ListItemText primary={`${typeOfWork.point}. ${typeOfWork.name}`} />
                            </MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
        </Box>
    )
}

export default TypeOfWork