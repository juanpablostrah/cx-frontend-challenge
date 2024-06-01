import { useProductContext } from "@/context/ProductContext";
import React, { useEffect, useState } from "react";
import { searchProducts } from "../search/Search";
import styles from "./FilterPrice.module.css";

type FilterValue = {
	id: string;
	name: string;
	results: number;
};

const FilterPrice = () => {
	const [filterPrice, setFilterPrice] = useState<FilterValue[] | undefined>(
		undefined
	);

	const {
		addProducts,
		removeProducts,
		searchText,
		searchResponse,
		selectedSort,
		filterSelected,
		setFilterSelected,
	} = useProductContext();

	useEffect(() => {
		setFilterPrice(
			searchResponse?.available_filters?.find(
				(filter: FilterValue) => filter.id === "price"
			)?.values
		);
	}, [searchResponse]);

	useEffect(() => {
		searchProducts({
			text: searchText,
			removeProducts,
			addProducts,
			orderBy: selectedSort?.id,
			filterPrice: filterSelected,
		});
	}, [filterSelected]);

	const handleSearchByFilterPrice = (filterId: string) => {
		console.log("filter.id: ", filterId);
		setFilterSelected(filterId);
	};

	console.log("filterPrice: ", filterPrice);
	return (
		<div
			className={styles.container}
			style={{
				display: "block",
			}}
		>
			<h3 className={styles.title}>Precio</h3>
			{filterPrice?.map((filter) => (
				<span
					key={filter.id}
					className={styles.filterOption}
					onClick={() => handleSearchByFilterPrice(filter.id)}
				>
					{filter.name}
				</span>
			))}
			<span className={styles.spanPrice}>
				<input type="text" className={styles.input} placeholder="Mínimo" />
				{" - "}
				<input type="text" className={styles.input} placeholder="Máximo" />
			</span>
		</div>
	);
};

export default FilterPrice;
