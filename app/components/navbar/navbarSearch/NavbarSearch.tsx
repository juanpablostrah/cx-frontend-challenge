import React, { useEffect } from "react";
import logoML from "../../../../resources/logo_ml.png";
import styles from "./NavbarSearch.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { ApiProductResponse } from "../../search/products/ProductType";
import { useSelector, useDispatch } from "react-redux";

import {
	setSearchText,
	removeProducts,
	addProducts,
} from "@/redux/slices/productSlice";
import { RootState } from "../../../redux/store";

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
};

const NavbarSearch = () => {
	const dispatch = useDispatch();
	const searchText = useSelector(
		(state: RootState) => state.products.searchText
	);

	useEffect(() => {
		if (typeof window !== "undefined") {
			const params = new URLSearchParams(window.location.search);
			const query = params.get("q");
			if (query) {
				dispatch(setSearchText(query));
				searchProducts({
					text: query,
					removeProducts: () => dispatch(removeProducts()),
					addProducts: (products) => dispatch(addProducts(products)),
				});
			}
		}
	}, [dispatch]);

	const handleSearchClick = () => {
		const newUrl = new URL(window.location.href);
		newUrl.searchParams.set("q", searchText);
		window.history.pushState({}, "", newUrl.toString());

		searchProducts({
			text: searchText,
			removeProducts: () => dispatch(removeProducts()),
			addProducts: (products) => dispatch(addProducts(products)),
		});
	};

	const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			handleSearchClick();
		}
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
						onChange={(e) => dispatch(setSearchText(e.target.value))}
						onKeyPress={handleKeyPress}
					/>
					<button
						onClick={handleSearchClick}
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

export default NavbarSearch;
