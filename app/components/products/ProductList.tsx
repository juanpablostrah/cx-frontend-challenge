import { useProductContext } from "@/context/ProductContext";
import React, { useState } from "react";
import SortList from "../sort/SortList";
import Product from "./Product";

const ProductList = () => {
	const { products } = useProductContext();

	return (
		<div>
			<section aria-labelledby="product-list-title">
				<SortList />
				{products?.length > 0 && (
					<ul>
						{products.map((product) => (
							<Product key={product.id} product={product} />
						))}
					</ul>
				)}
			</section>
		</div>
	);
};

export default ProductList;
