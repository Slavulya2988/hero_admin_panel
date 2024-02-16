import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useHttp } from '../../hooks/http.hook';

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle'
};

export const heroesFetch = createAsyncThunk(
    'heroes/heroesFetch',
    () => {
        const {request} = useHttp();
        return request("http://localhost:3001/heroes");
    }
)

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        heroDelete: (state,action) => {
            state.heroes = state.heroes.filter(item => item.id !== action.payload)
        },
        heroAdd: (state,action) =>{
            state.heroes.push(action.payload);
        }
    },
	 extraReducers: (builder) => {
		builder
			.addCase(heroesFetch.pending, state => {
				state.heroesLoadingStatus = 'loading' ;
		})
			.addCase(heroesFetch.fulfilled, (state,action) => {
				state.heroesLoadingStatus = 'idle';
				state.heroes = action.payload;
		})
			.addCase(heroesFetch.rejected, state => {
				state.heroesLoadingStatus = 'error';
		})
			.addDefaultCase(()=>{})
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
