import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio: string;
  followers: number;
  following: number;
  statusesCount: number;
}

interface UserState {
  currentUser: User | null;
  isAuthenticated: boolean;
  savedStatuses: string[];
  followedUsers: string[];
}

const initialState: UserState = {
  currentUser: {
    id: '1',
    name: 'Creative User',
    username: '@creative_user',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    bio: 'Creating beautiful statuses daily ✨',
    followers: 1240,
    following: 890,
    statusesCount: 125,
  },
  isAuthenticated: true,
  savedStatuses: [],
  followedUsers: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
    },
    setAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    addSavedStatus: (state, action: PayloadAction<string>) => {
      if (!state.savedStatuses.includes(action.payload)) {
        state.savedStatuses.push(action.payload);
      }
    },
    removeSavedStatus: (state, action: PayloadAction<string>) => {
      state.savedStatuses = state.savedStatuses.filter(id => id !== action.payload);
    },
    followUser: (state, action: PayloadAction<string>) => {
      if (!state.followedUsers.includes(action.payload)) {
        state.followedUsers.push(action.payload);
      }
    },
    unfollowUser: (state, action: PayloadAction<string>) => {
      state.followedUsers = state.followedUsers.filter(id => id !== action.payload);
    },
  },
});

export const {
  setCurrentUser,
  setAuthenticated,
  addSavedStatus,
  removeSavedStatus,
  followUser,
  unfollowUser,
} = userSlice.actions;

export default userSlice.reducer;