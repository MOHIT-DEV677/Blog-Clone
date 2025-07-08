import {configureStore} from '@reduxjs/toolkit';
import blogReducer from './blogSlice';
import userReducer from './userSlice'
import followReducer from './followerSlice'
import followingReducer from './followingSlice'
import commentReducer from './commentSlice'
export const store=configureStore({
    reducer:{
        blog:blogReducer,
        user:userReducer,
        follower:followReducer,
        following:followingReducer,
        comment:commentReducer
    }
})
