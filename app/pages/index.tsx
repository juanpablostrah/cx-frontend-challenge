import FilterPrice from "@/components/filterPrice/FilterPrice";
import ProductList from "@/components/products/ProductList";
import Search from "@/components/search/Search";
import store from "@/redux/store";
import { Inter } from "@next/font/google";
import { Provider } from "react-redux";

import styles from "./Index.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	return (
		<Provider store={store}>
			<div className={styles.header}>
				<Search />
			</div>
			<div className={styles.container}>
				<aside className={styles.aside}>
					<FilterPrice />
				</aside>
				<main className={styles.main}>
					<ProductList />
				</main>
			</div>
		</Provider>
	);
}
