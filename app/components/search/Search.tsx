import React, { useState, useEffect } from "react";
import logoML from "../../../resources/logo_ml.png";
import styles from "./Search.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useProductContext } from "@/context/ProductContext";
import { ApiProductResponse } from "../products/ProductType";

const Search = () => {
	const [searchText, setSearchText] = useState<string>("");

	const { addProducts, removeProducts } = useProductContext();

	useEffect(() => {
		const storageSearchText = localStorage.getItem("searchText");
		if (storageSearchText !== null) {
			setSearchText(storageSearchText);
			searchProducts(storageSearchText);
		}
	}, []);

	const searchProducts = async (text: string = searchText) => {
		removeProducts();
		const response = await fetch(
			`https://api.mercadolibre.com/sites/MLA/search?q=${text}&limit=10`
		);
		const products: ApiProductResponse = await response.json();
		addProducts(products.results);
		localStorage.setItem("searchText", text);
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
						onChange={(e) => setSearchText(e.target.value)}
					/>
					<FontAwesomeIcon
						icon={faSearch}
						className={styles.searchButton}
						onClick={() => searchProducts()}
					/>
				</div>
			</div>
		</header>
	);
};

export default Search;
