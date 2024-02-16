import { heroesFetching, heroesFetched,heroesFetchingError } from '../components/heroesList/heroesSlice';
import { filtersFetching, filtersFetched, filtersFetchingError} from '../components/heroesFilters/filterSlice';

export const heroesFetch = (request) => (dispatch) => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
        .then(data => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()))
}
export const filterFetch = (request) => (dispatch) => {
    dispatch(filtersFetching());
        request("http://localhost:3001/filters")
            .then(data => dispatch(filtersFetched(data)))
            .catch(() => dispatch(filtersFetchingError()))

}

// export const heroesFetching = createAction('HEROES_FETCHING');
// export const heroesFetched =  createAction('HEROES_FETCHED');
// export const heroesFetchingError = createAction('HEROES_FETCHING_ERROR');
// export const heroDelete = createAction('HERO_DELETE');
// export const heroAdd = createAction('HERO_ADD');

// export const heroesFetching = () => {
//     return {
//         type: 'HEROES_FETCHING'
//     }
// }

// export const heroesFetched = (heroes) => {
//     return {
//         type: 'HEROES_FETCHED',
//         payload: heroes
//     }
// }

// export const heroesFetchingError = () => {
//     return {
//         type: 'HEROES_FETCHING_ERROR'
//     }
// }


// export const heroDelete = (id) => {
//     return {
//         type: 'HERO_DELETE',
//         payload: id
//     }
// }

// export const heroAdd = (hero) =>{
//     return {
//         type: 'HERO_ADD',
//         payload: hero
//     }
// }



// export const filtersFetching = () => {
//     return {
//         type: 'FILTERS_FETCHING'
//     }
// }

// export const filtersFetched = (filters) => {
//     return {
//         type: 'FILTERS_FETCHED',
//         payload: filters
//     }
// }

// export const filtersFetchingError = () => {
//     return {
//         type: 'FILTERS_FETCHING_ERROR'
//     }
// }

// export const activeFilterChanged = (filters) => (dispatch) => {

//     dispatch(
//         {
//             type: 'ACTIVE_FILTER_CHANGED',
//             payload: filters
//         }
//     )

// }
