import { useProductContext } from "@/context/ProductContext";
import React, { useState } from "react";
import SortList from "../sort/SortList";
import Product from "./Product";

const ProductList = () => {
	const [sortCriteria, setSortCriteria] = useState<string>("relevance");
	const { products, addProducts } = useProductContext();

	const handleSortChange = (criteria: string) => {
		setSortCriteria(criteria);
	};

	return (
		<main>
			<div>
				<section aria-labelledby="product-list-title">
					<SortList onSortChange={handleSortChange} />
					{products.length > 0 && (
						<ul>
							{products.map((product) => (
								<Product key={product.id} product={product} />
							))}
						</ul>
					)}
				</section>
			</div>
		</main>
	);
};

export default ProductList;
