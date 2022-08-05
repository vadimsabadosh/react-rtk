import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GithubState {
	favorites: string[];
}

const LS_FAV_KEY = "git_fk";

const initialState: GithubState = {
	favorites: JSON.parse(localStorage.getItem(LS_FAV_KEY) ?? "[]"),
};

export const githubSlice = createSlice({
	name: "github",
	initialState,
	reducers: {
		addFavorite(state: GithubState, action: PayloadAction<string>) {
			state.favorites.push(action.payload);
			localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favorites));
		},
		removeFavorite(state: GithubState, action: PayloadAction<string>) {
			state.favorites = state.favorites.filter((f) => f !== action.payload);
		},
	},
});

export const githubActions = githubSlice.actions;
export const githubReducer = githubSlice.reducer;
