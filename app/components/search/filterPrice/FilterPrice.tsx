import {
	addProducts,
	removeProducts,
	setFilterSelected,
} from "@/redux/slices/productSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { searchProducts } from "../../navbar/navbarSearch/NavbarSearch";
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
	const [minPriceValue, setMinPriceValue] = useState<string>("");
	const [maxPriceValue, setMaxPriceValue] = useState<string>("");

	const dispatch = useDispatch();
	const { searchResponse, searchText, selectedSort } = useSelector(
		(state: RootState) => state.products
	);

	useEffect(() => {
		setFilterPrice(
			searchResponse?.available_filters?.find(
				(filter: FilterValue) => filter.id === "price"
			)?.values
		);
	}, [searchResponse]);

	const handleSearchByFilterPrice = (filterId: string) => {
		dispatch(setFilterSelected(filterId));
		searchProducts({
			text: searchText,
			removeProducts: () => dispatch(removeProducts()),
			addProducts: (products) => dispatch(addProducts(products)),
			orderBy: selectedSort?.id,
			filterPrice: filterId,
		});
	};

	const handleOnClickBetweenPrice = () => {
		let minValue =
			minPriceValue === "" || minPriceValue === undefined
				? "*"
				: parseFloat(minPriceValue).toFixed(1);
		let maxValue =
			maxPriceValue === "" || maxPriceValue === undefined
				? "*"
				: parseFloat(maxPriceValue).toFixed(1);

		const filterRange = `${minValue}-${maxValue}`;
		dispatch(setFilterSelected(filterRange));

		searchProducts({
			text: searchText,
			removeProducts: () => dispatch(removeProducts()),
			addProducts: (products) => dispatch(addProducts(products)),
			orderBy: selectedSort?.id,
			filterPrice: filterRange,
		});
	};

	return (
		<div className={styles.container}>
			<h3 className={styles.title}>Precio</h3>
			{filterPrice?.map((filter) => (
				<span
					key={filter.id}
					className={styles.filterOption}
					onClick={() => handleSearchByFilterPrice(filter.id)}
				>
					{filter.name}
					<span className={styles.results}>{`(${filter.results})`}</span>
				</span>
			))}
			<span className={styles.spanPrice}>
				<input
					onChange={(e) => setMinPriceValue(e.target.value)}
					type="text"
					className={styles.input}
					style={{ marginRight: 5 }}
					placeholder="Mínimo"
				/>
				{" - "}
				<input
					onChange={(e) => setMaxPriceValue(e.target.value)}
					type="text"
					className={styles.input}
					style={{ marginLeft: 5 }}
					placeholder="Máximo"
				/>
				<button
					onClick={handleOnClickBetweenPrice}
					className={styles.buttonPrice}
				>
					{" > "}
				</button>
			</span>
		</div>
	);
};

export default FilterPrice;
