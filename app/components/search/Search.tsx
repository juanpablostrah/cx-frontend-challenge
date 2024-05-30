import React, { useState, useEffect } from "react";
import logoML from "../../../resources/logo_ml.png";
import styles from "./Search.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useProductContext } from "@/context/ProductContext";
import { ApiProductResponse } from "../products/ProductType";

export const searchProducts = async (
	text: string,
	removeProducts: () => void,
	addProducts: (apiResponse: ApiProductResponse) => void,
	orderBy?: string
) => {
	removeProducts();
	const response = await fetch(
		`https://api.mercadolibre.com/sites/MLA/search?q=${text}&sort=${orderBy}&limit=10`
	);
	const products: ApiProductResponse = await response.json();
	addProducts(products);
	localStorage.setItem("searchText", text);
};

const Search = () => {
	const { addProducts, removeProducts, setSearchText, searchText } =
		useProductContext();

	useEffect(() => {
		const storageSearchText = localStorage.getItem("searchText");
		if (storageSearchText !== null) {
			setSearchText(storageSearchText);
			searchProducts(storageSearchText, removeProducts, addProducts);
		}
	}, []);

	const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchText(e.target.value);
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
						onChange={(e) => handleSearchText(e)}
					/>
					<button
						onClick={() =>
							searchProducts(searchText, removeProducts, addProducts)
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
