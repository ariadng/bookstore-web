"use client";

import { useAuth } from "@/context/AuthContext";
import styles from "./_/styles/style.module.scss";
import { Icon } from "@/ui";

export default function AdminPage() {

	const auth = useAuth();

	return (
		<div className={styles.AdminIndexPage}>
			<Icon className={styles.Icon} name="dashboard" />
			<p className={styles.Lead}>Silakan pilih menu</p>
		</div>
	);

}