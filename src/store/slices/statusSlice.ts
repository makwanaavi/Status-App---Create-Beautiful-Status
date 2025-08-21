import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Status {
  id: string;
  text: string;
  category: string;
  author: string;
  authorAvatar: string;
  background: string;
  font: string;
  color: string;
  likes: number;
  saves: number;
  isLiked: boolean;
  isSaved: boolean;
  createdAt: string;
  tags: string[];
  type: 'quote' | 'photo';
  image?: string;
}

interface StatusState {
  statuses: Status[];
  filteredStatuses: Status[];
  categories: string[];
  activeCategory: string;
  searchQuery: string;
  loading: boolean;
  selectedStatus: Status | null;
}

const initialState: StatusState = {
  statuses: [],
  filteredStatuses: [],
  categories: [
    'All', 'Love', 'Motivational', 'Sad', 'Funny', 'Life', 'Friendship',
    'Success', 'Travel', 'Nature', 'Wisdom', 'Happiness', 'Dreams',
    'Faith', 'Family', 'Attitude', 'Birthday', 'Good Morning', 'Good Night',
    'Festival', 'Fashion', 'Sports', 'Music', 'Food', 'Technology'
  ],
  activeCategory: 'All',
  searchQuery: '',
  loading: false,
  selectedStatus: null,
};

const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    setStatuses: (state, action: PayloadAction<Status[]>) => {
      state.statuses = action.payload;
      state.filteredStatuses = action.payload;
    },
    setActiveCategory: (state, action: PayloadAction<string>) => {
      state.activeCategory = action.payload;
      state.filteredStatuses = action.payload === 'All' 
        ? state.statuses 
        : state.statuses.filter(status => status.category === action.payload);
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      const query = action.payload.toLowerCase();
      state.filteredStatuses = state.statuses.filter(status =>
        status.text.toLowerCase().includes(query) ||
        status.category.toLowerCase().includes(query) ||
        status.tags.some(tag => tag.toLowerCase().includes(query))
      );
    },
    toggleLike: (state, action: PayloadAction<string>) => {
      const status = state.statuses.find(s => s.id === action.payload);
      if (status) {
        status.isLiked = !status.isLiked;
        status.likes += status.isLiked ? 1 : -1;
      }
    },
    toggleSave: (state, action: PayloadAction<string>) => {
      const status = state.statuses.find(s => s.id === action.payload);
      if (status) {
        status.isSaved = !status.isSaved;
        status.saves += status.isSaved ? 1 : -1;
      }
    },
    setSelectedStatus: (state, action: PayloadAction<Status | null>) => {
      state.selectedStatus = action.payload;
    },
    addStatus: (state, action: PayloadAction<Status>) => {
      state.statuses.unshift(action.payload);
      state.filteredStatuses.unshift(action.payload);
    },
  },
});

export const {
  setStatuses,
  setActiveCategory,
  setSearchQuery,
  toggleLike,
  toggleSave,
  setSelectedStatus,
  addStatus,
} = statusSlice.actions;

export default statusSlice.reducer;