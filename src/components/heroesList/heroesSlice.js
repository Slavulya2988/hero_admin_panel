import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/http.hook';

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle'
};

// export const heroesFetch = (request) => (dispatch) => {
//     dispatch(heroesFetching());
//     request("http://localhost:3001/heroes")
//         .then(data => dispatch(heroesFetched(data)))
//         .catch(() => dispatch(heroesFetchingError()))
// }

const heroesFetch = createAsyncThunk(
    'heroes/heroesFetch',
    () => {
        const {request} = useHttp();
        request("http://localhost:3001/heroes");
    }
)

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        heroesFetching: state => {
            state.heroesLoadingStatus = 'loading' ;
        },
        heroesFetched: (state,action) => {
            state.heroes = action.payload;
        },
        heroesFetchingError: state =>{
            state.heroesLoadingStatus = 'error';
        },
        heroDelete: (state,action) => {
            state.heroes = state.heroes.filter(item => item.id !== action.payload)
        },
        heroAdd: (state,action) =>{
            state.heroes.push(action.payload);
        }
    }
}) ;

const {actions, reducer} = heroesSlice;

export default reducer;
export const {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroDelete,
    heroAdd
} = actions;
