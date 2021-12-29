import {appDomain} from 'src/models/App';
import {getTypeOfWorksSign} from 'src/api/signatures/TypeOfWork';


export const $typeOfWorks = appDomain.createStore([], {name: 'typeOfWorks'})

export const getTypeOfWorksFx = appDomain.createEffect(getTypeOfWorksSign)

export const getTypeOfWorksFn = appDomain.createEvent('getTypeOfWorksFn')


export const $typeOfWorksArray = $typeOfWorks.map(typesOfWorks => {
    let result = [];
    typesOfWorks.forEach(category => {
        const {types_of_works, ...cleanedCategory} = category;
        result.push({...cleanedCategory, category: true})
        category.types_of_works.forEach(work => {
            result.push({...work, category: false, categoryId: category.id})
        })
    })
    return result
})