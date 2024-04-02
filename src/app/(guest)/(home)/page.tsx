import { Suspense } from "react";
import { HomeBookList, MobileSearch } from "./_/components";
import styles from "./_/styles/style.module.scss";

export default function Home() {

	return (
		<div className={styles.HomePage}>
			<Suspense>
				<MobileSearch />
				<HomeBookList />
			</Suspense>
		</div>
	);

}