import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";
import FilterPrice from "../search/filterPrice/FilterPrice";
import ProductList from "../search/products/ProductList";
import NavbarSearch from "../navbar/navbarSearch/NavbarSearch";
import styles from "./Layout.module.css";

const Layout = () => {
	const { products } = useSelector((state: RootState) => state.products);
	return (
		<div>
			<div className={styles.header}>
				<NavbarSearch />
			</div>
			<div className={styles.container}>
				{products?.length > 0 && (
					<aside className={styles.aside}>
						<FilterPrice />
					</aside>
				)}
				<main className={styles.main}>
					<ProductList />
				</main>
			</div>
		</div>
	);
};

export default Layout;
