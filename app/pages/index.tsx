import Layout from "@/components/layout/Layout";
import store from "@/redux/store";
import { Inter } from "@next/font/google";
import { Provider } from "react-redux";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
	return (
		<Provider store={store}>
			<Layout />
		</Provider>
	);
}
