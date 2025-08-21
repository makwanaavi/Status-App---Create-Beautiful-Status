import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EditorState {
  text: string;
  font: string;
  fontSize: number;
  color: string;
  background: string;
  backgroundType: 'solid' | 'gradient' | 'image';
  alignment: 'left' | 'center' | 'right';
  isEditorOpen: boolean;
  availableFonts: string[];
  availableBackgrounds: string[];
  searchQuery: string;
}

const initialState: EditorState = {
  text: '',
  font: 'Inter',
  fontSize: 24,
  color: '#ffffff',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  backgroundType: 'gradient',
  alignment: 'center',
  isEditorOpen: false,
  availableFonts: [
    'Inter', 'Playfair Display', 'Montserrat', 'Roboto', 'Open Sans',
    'Poppins', 'Lora', 'Merriweather', 'Source Sans Pro', 'Raleway',
    'Nunito', 'Ubuntu', 'Dancing Script', 'Pacifico', 'Caveat'
  ],
  availableBackgrounds: [
    'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
    'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
  ],
  searchQuery: '',
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
    setFont: (state, action: PayloadAction<string>) => {
      state.font = action.payload;
    },
    setFontSize: (state, action: PayloadAction<number>) => {
      state.fontSize = action.payload;
    },
    setColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload;
    },
    setBackground: (state, action: PayloadAction<string>) => {
      state.background = action.payload;
    },
    setBackgroundType: (state, action: PayloadAction<'solid' | 'gradient' | 'image'>) => {
      state.backgroundType = action.payload;
    },
    setAlignment: (state, action: PayloadAction<'left' | 'center' | 'right'>) => {
      state.alignment = action.payload;
    },
    setEditorOpen: (state, action: PayloadAction<boolean>) => {
      state.isEditorOpen = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    resetEditor: (state) => {
      state.text = '';
      state.font = 'Inter';
      state.fontSize = 24;
      state.color = '#ffffff';
      state.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
      state.backgroundType = 'gradient';
      state.alignment = 'center';
    },
  },
});

export const {
  setText,
  setFont,
  setFontSize,
  setColor,
  setBackground,
  setBackgroundType,
  setAlignment,
  setEditorOpen,
  setSearchQuery,
  resetEditor,
} = editorSlice.actions;

export default editorSlice.reducer;