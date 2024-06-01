import {
	ApiProductResponse,
	ProductType,
} from "@/components/products/ProductType";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface ProductContextProps {
	products: ProductType[];
	searchResponse: ApiProductResponse;
	addProducts: (searchResponse: ApiProductResponse) => void;
	removeProducts: () => void;
	searchText: string;
	setSearchText: (text: string) => void;
	selectedSort?: SortOption;
	setSelectedSort: (sortOption: SortOption) => void;
	filterSelected: string;
	setFilterSelected: (filterId: string) => void;
}

interface SortOption {
	id: string;
	name: string;
}

const ProductContext = createContext<ProductContextProps | undefined>(
	undefined
);

interface ProductProviderProps {
	children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({
	children,
}) => {
	const [products, setProducts] = useState<ProductType[]>([]);
	const [searchResponse, setSearchResponse] = useState<ApiProductResponse>({
		results: [],
		available_filters: undefined,
		available_sorts: [],
	});
	const [searchText, setSearchText] = useState<string>("");
	const [selectedSort, setSelectedSort] =
		useState<{ id: string; name: string }>();
	const [filterSelected, setFilterSelected] = useState<string>("");

	const addProducts = (searchResponse: ApiProductResponse) => {
		setSearchResponse(searchResponse);
		console.log("searchResponse: ", searchResponse.available_filters);
		setProducts(searchResponse.results);
	};

	const removeProducts = () => {
		return setProducts([]);
	};

	return (
		<ProductContext.Provider
			value={{
				products,
				addProducts,
				removeProducts,
				searchResponse,
				searchText,
				setSearchText,
				selectedSort,
				setSelectedSort,
				filterSelected,
				setFilterSelected,
			}}
		>
			{children}
		</ProductContext.Provider>
	);
};

export const useProductContext = () => {
	const context = useContext(ProductContext);
	if (context === undefined) {
		throw new Error("useProductContext must be used within a ProductProvider");
	}
	return context;
};
