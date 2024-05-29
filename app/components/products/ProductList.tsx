import { useProductContext } from "@/context/ProductContext";
import React from "react";
import Product from "./Product";

const ProductList = () => {
	const { products } = useProductContext();

	return (
		<main>
			<div>
				{products.map((product) => (
					<Product key={product.id} product={product} />
				))}
			</div>
		</main>
	);
};

export default ProductList;
