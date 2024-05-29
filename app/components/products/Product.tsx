import { formatNumberWithDots, roundNumber } from "@/utils/utils";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "./Product.module.css";

type ProductProps = {
	product: {
		id: string;
		thumbnail: string;
		price: number;
		title: string;
		shipping: {
			free_shipping: boolean;
		};
		installments?: {
			quantity: number;
			amount: string;
		};
	};
};

const Product = ({ product }: ProductProps) => {
	return (
		<div>
			<div className={styles.container}>
				<div className={styles.widthImg}>
					<img
						className={styles.imgProduct}
						src={product.thumbnail}
						alt="Imagen del producto"
					/>
				</div>
				<div className={styles.widthDescription}>
					<div className={styles.flexIcon}>
						<span className={styles.productPrice}>
							{`$${formatNumberWithDots(product.price)}`}{" "}
						</span>
						{product.shipping.free_shipping && (
							<div className={styles.truckIcon}>
								<FontAwesomeIcon size="xs" icon={faTruck} />
							</div>
						)}
					</div>
					<h2 className={styles.productTitle}>{product.title}</h2>
					{product.installments && (
						<p className={styles.installments}>
							{`En ${
								product.installments?.quantity
							} cuotas de $${formatNumberWithDots(
								roundNumber(product.installments?.amount)
							)}`}
						</p>
					)}
				</div>
				<div className={styles.widthProvince}>
					<p className={styles.province}>{"Capital Federal"}</p>
				</div>
			</div>
			<div className={styles.horizontalLine} />
		</div>
	);
};

export default Product;
