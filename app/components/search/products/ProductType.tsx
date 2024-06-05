export interface ProductType {
	id: string;
	title: string;
	price: number;
	installments: {
		quantity: number;
		amount: string;
	};
	address: {
		state_name: string;
		city_name: string;
	};
	thumbnail: string;
	condition: string;
	shipping: Shipping;
}

export interface Shipping {
	benefits: any;
	free_shipping: boolean;
	logistic_type: string;
}

export interface ApiProductResponse {
	available_sorts: {
		id: string;
		name: string;
	}[];
	available_filters: any;
	results: ProductType[];
}
export interface ProductState {
	products: ProductType[];
	searchResponse: ApiProductResponse;
	searchText: string;
	selectedSort?: SortOption;
	filterSelected: string;
}

export interface SortOption {
	id: string;
	name: string;
}
