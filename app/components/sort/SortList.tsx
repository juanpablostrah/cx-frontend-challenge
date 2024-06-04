import {
	addProducts,
	removeProducts,
	setSelectedSort,
} from "@/redux/slices/productSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { searchProducts } from "../search/Search";
import styles from "./SortList.module.css";

const SortList: React.FC = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isRotated, setIsRotated] = useState(false);

	const dispatch = useDispatch();
	const { searchText, searchResponse, selectedSort, filterSelected } =
		useSelector((state: RootState) => state.products);

	const toggleDropdown = () => {
		toggleRotation();
		setIsOpen(!isOpen);
	};

	useEffect(() => {
		searchProducts({
			text: searchText,
			removeProducts: () => dispatch(removeProducts()),
			addProducts: (products) => dispatch(addProducts(products)),
			orderBy: selectedSort?.id,
			filterPrice: filterSelected,
		});
	}, [selectedSort, searchText, filterSelected, dispatch]);

	const handleSortChange = (sortOption: { id: string; name: string }) => {
		dispatch(setSelectedSort(sortOption));
		setIsOpen(false);
	};

	const toggleRotation = () => {
		setIsRotated(!isRotated);
	};

	return (
		<div className={styles.sortListContainer}>
			<span className={styles.selectorLabel}>Ordenar por: </span>
			<button className={styles.sortButton} onClick={toggleDropdown}>
				{selectedSort?.name || "Más relevantes"}
				<img
					className={`${styles.sortSymbol} ${
						isRotated ? styles.rotated : styles.noRotated
					}`}
					src="https://www.pngitem.com/pimgs/m/182-1825185_caret-symbol-png-transparent-png.png"
					alt=""
				/>
			</button>
			{isOpen && (
				<ul className={styles.sortOptions}>
					{searchResponse.available_sorts?.map((sortOption) => (
						<li
							key={sortOption.id}
							className={
								selectedSort?.id === sortOption.id ? styles.active : ""
							}
							onClick={() => handleSortChange(sortOption)}
						>
							{sortOption.name}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default SortList;
