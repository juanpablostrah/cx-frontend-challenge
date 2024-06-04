import React, { useEffect } from "react";
import logoML from "../../../resources/logo_ml.png";
import styles from "./Search.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { ApiProductResponse } from "../products/ProductType";
import { useSelector, useDispatch } from "react-redux";

import {
	setSearchText,
	removeProducts,
	addProducts,
} from "@/redux/slices/productSlice";
import { RootState } from "../../redux/store";

type SearchProductsParams = {
	text: string;
	removeProducts: () => void;
	addProducts: (apiResponse: ApiProductResponse) => void;
	orderBy?: string;
	filterPrice?: string;
};

export const searchProducts = async ({
	text,
	removeProducts,
	addProducts,
	orderBy,
	filterPrice,
}: SearchProductsParams) => {
	removeProducts();
	let url = `https://api.mercadolibre.com/sites/MLA/search?q=${text}&limit=10`;

	if (orderBy) {
		url += `&sort=${orderBy}`;
	}
	if (filterPrice) {
		url += `&price=${filterPrice}`;
	}
	const response = await fetch(url);
	const products: ApiProductResponse = await response.json();
	addProducts(products);
	localStorage.setItem("searchText", text);
};

const Search = () => {
	const dispatch = useDispatch();
	const searchText = useSelector(
		(state: RootState) => state.products.searchText
	);

	useEffect(() => {
		const storageSearchText = localStorage.getItem("searchText");
		if (storageSearchText !== null) {
			dispatch(setSearchText(storageSearchText));
			searchProducts({
				text: storageSearchText,
				removeProducts: () => dispatch(removeProducts()),
				addProducts: (products) => dispatch(addProducts(products)),
			});
		}
	}, [dispatch]);

	const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newText = e.target.value;
		console.log("e.target.value: ", newText);
		dispatch(setSearchText(newText));
	};

	return (
		<header className={styles.headerContainer}>
			<div className={styles.container}>
				<img src={logoML.src} className={styles.logo} alt="logoML" />
				<div className={styles.searchContainer}>
					<input
						type="text"
						placeholder="Buscar productos, marcas y más..."
						value={searchText}
						className={styles.searchInput}
						onChange={handleSearchText}
					/>
					<button
						onClick={() =>
							searchProducts({
								text: searchText,
								removeProducts: () => dispatch(removeProducts()),
								addProducts: (products) => dispatch(addProducts(products)),
							})
						}
						className={styles.searchButton}
						aria-label="Buscar"
					>
						<FontAwesomeIcon icon={faSearch} />
					</button>
				</div>
			</div>
		</header>
	);
};

export default Search;
