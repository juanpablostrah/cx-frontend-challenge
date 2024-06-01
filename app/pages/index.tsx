import FilterPrice from "@/components/filterPrice/FilterPrice";
import ProductList from "@/components/products/ProductList";
import Search from "@/components/search/Search";
import { ProductProvider } from "@/context/ProductContext";
import { Inter } from "@next/font/google";
import "./search.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	return (
		<ProductProvider>
			{/* sacar header para aca */}
			<div
				style={{
					position: "absolute",
					zIndex: "1",
					width: "100%",
					backgroundColor: "green",
				}}
			>
				<Search />
			</div>
			<div
				style={{
					position: "absolute",
					display: "flex",
					marginLeft: "20vw",
					width: "60vw",
					paddingTop: "65px",
					minHeight: "100vh",
					backgroundColor: "red",
				}}
			>
				<aside
					style={{
						display: "flex",
						backgroundColor: "green",
						width: "20%",
					}}
				>
					<FilterPrice />
				</aside>
				<main
					style={{
						display: "flex",
						backgroundColor: "blue",
						width: "80%",
					}}
				>
					<ProductList />
				</main>
			</div>
		</ProductProvider>
	);
}
