// src/slices/productSlice.ts
import {
	ApiProductResponse,
	ProductState,
	SortOption,
} from "@/components/products/ProductType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ProductState = {
	products: [],
	searchResponse: {
		results: [],
		available_filters: undefined,
		available_sorts: [],
	},
	searchText: "",
	selectedSort: undefined,
	filterSelected: "",
};

export const productSlice = createSlice({
	name: "products",
	initialState,
	reducers: {
		addProducts: (state, action: PayloadAction<ApiProductResponse>) => {
			state.searchResponse = action.payload;
			state.products = action.payload.results;
		},
		removeProducts: (state) => {
			state.products = [];
		},
		setSearchText: (state, action: PayloadAction<string>) => {
			state.searchText = action.payload;
		},
		setSelectedSort: (state, action: PayloadAction<SortOption | undefined>) => {
			state.selectedSort = action.payload;
		},
		setFilterSelected: (state, action: PayloadAction<string>) => {
			state.filterSelected = action.payload;
		},
	},
});

export const {
	addProducts,
	removeProducts,
	setSearchText,
	setSelectedSort,
	setFilterSelected,
} = productSlice.actions;

export default productSlice.reducer;
