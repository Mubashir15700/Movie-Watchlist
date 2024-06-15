import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import movieReducer from './slices/movieSlice';

const rootReducer = combineReducers({
    auth: authReducer,
    movie: movieReducer,
});

export default rootReducer;
