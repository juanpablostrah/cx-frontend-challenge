import React from "react";
import styles from "./Product.module.css";

const NoProducts = () => {
	return (
		<div>
			<h2 className={styles.titleNoProduct}>
				No hay Productos en la lista, ingresa algun texto en el buscador
			</h2>
		</div>
	);
};

export default NoProducts;
