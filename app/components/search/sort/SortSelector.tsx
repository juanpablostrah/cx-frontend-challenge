import React, { useState, ChangeEvent } from "react";
import styles from "./SortSelector.module.css";

interface SortSelectorProps {
	onSortChange: (criteria: string) => void;
}

const SortSelector: React.FC<SortSelectorProps> = ({ onSortChange }) => {
	const [selectedSort, setSelectedSort] = useState<string>("");

	const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
		const selectedValue = event.target.value;
		setSelectedSort(selectedValue);
		onSortChange(selectedValue);
	};

	return (
		<div className={styles.selectorContainer}>
			<label htmlFor="sort" className={styles.selectorLabel}>
				Ordenar por
			</label>
			<select
				id="sort"
				value={selectedSort}
				onChange={handleChange}
				className={styles.selector}
			>
				<option className={styles.optionSelector} value="relevance">
					Más relevantes
				</option>
				<option className={styles.optionSelector} value="lowestPrice">
					Menor precio
				</option>
				<option className={styles.optionSelector} value="highestPrice">
					Mayor precio
				</option>
			</select>
		</div>
	);
};

export default SortSelector;
