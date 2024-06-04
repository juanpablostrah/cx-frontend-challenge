import { RootState } from "../../redux/store";
import React from "react";
import { useSelector } from "react-redux";
import SortList from "../sort/SortList";
import NoProducts from "./NoProducts";
import Product from "./Product";

const ProductList = () => {
	const { products } = useSelector((state: RootState) => state.products);

	return (
		<div style={{ margin: "auto" }}>
			<section aria-labelledby="product-list-title">
				<SortList />
				{products?.length > 0 ? (
					<>
						<ul>
							{products.map((product) => (
								<Product key={product.id} product={product} />
							))}
						</ul>
					</>
				) : (
					<NoProducts />
				)}
			</section>
		</div>
	);
};

export default ProductList;
