import { ProductType } from "@/components/products/ProductType";
import React, { createContext, useState, useContext, ReactNode } from "react";

interface ProductContextProps {
	products: ProductType[];
	addProducts: (product: ProductType[]) => void;
	removeProducts: () => void;
}

export const ProductContext = createContext<ProductContextProps | undefined>(
	undefined
);

interface ProductProviderProps {
	children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({
	children,
}) => {
	const [products, setProducts] = useState<ProductType[]>([]);

	const addProducts = (newProducts: ProductType[]) => {
		setProducts(newProducts);
	};

	const removeProducts = () => {
		return setProducts([]);
	};

	return (
		<ProductContext.Provider value={{ products, addProducts, removeProducts }}>
			{children}
		</ProductContext.Provider>
	);
};

export const useProductContext = () => {
	const context = useContext(ProductContext);
	if (context === undefined) {
		throw new Error("useProductContext must be used within a ProductProvider");
	}
	return context;
};
