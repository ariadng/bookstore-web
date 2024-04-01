"use client";

import { ReactNode } from "react";
import styles from "./styles/style.module.scss";
import { Button } from "@/ui";
import { usePathname } from "next/navigation";

export default function AdminListingViewLayout(props: {
	children?: ReactNode;
}) {

	const pathname = usePathname();

	return (
		<div className={styles.AdminListingViewLayout}>
			<div className={styles.Header}>
				<div className={styles.LeftActions}>
					<Button icon="close" size="small" href="/admin/listing" />
				</div>
				<div className={styles.Title}>
					View
				</div>
				<div className={styles.RightActions}>
					<Button icon="delete" size="small" color="danger" />
					<Button icon="edit" size="small" color="dark" href="/admin/listing/create" />
				</div>
			</div>
		</div>
	);

}