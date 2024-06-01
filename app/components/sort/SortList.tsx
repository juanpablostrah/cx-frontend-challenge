import { useProductContext } from "@/context/ProductContext";
import React, { useEffect, useState } from "react";
import { searchProducts } from "../search/Search";
import styles from "./SortList.module.css";

const SortList: React.FC = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isRotated, setIsRotated] = useState(false);
	const {
		searchResponse,
		searchText,
		removeProducts,
		addProducts,
		selectedSort,
		setSelectedSort,
		filterSelected,
	} = useProductContext();

	const toggleDropdown = () => {
		toggleRotation();
		setIsOpen(!isOpen);
	};

	useEffect(() => {
		searchProducts({
			text: searchText,
			removeProducts,
			addProducts,
			orderBy: selectedSort?.id,
			filterPrice: filterSelected,
		});
	}, [selectedSort]);

	const handleSortChange = (sortOption: { id: string; name: string }) => {
		setSelectedSort(sortOption);
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
