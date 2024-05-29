import ProductList from "@/components/products/ProductList";
import Search from "@/components/search/Search";
import { ProductProvider } from "@/context/ProductContext";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	return (
		<div style={{ backgroundColor: "#eeeeee", height: "100%" }}>
			<ProductProvider>
				<Search />
				<ProductList />
			</ProductProvider>
		</div>
	);
}
