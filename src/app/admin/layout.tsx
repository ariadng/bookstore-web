"use client";

import { ReactNode, useCallback, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import classNames from "classnames";
import styles from "./_/styles/style.module.scss";
import { AdminSidebar } from "@/components/AdminSidebar";

export default function AdminLayout (props: {
	children: ReactNode;
}) {

	const auth = useAuth();

	const [ loading, setLoading ] = useState<boolean>(true);
	const [ authorized, setAuthorized ] = useState<boolean>(false);

	const handleUserRefresh = useCallback(async () => {
		if (await auth.isAdmin()) {
			setAuthorized(true);
			setLoading(false);
		} else {
			setAuthorized(false);
			setLoading(false);
		} 
	}, [auth.user]);

	useEffect(() => {
		handleUserRefresh();
	}, [auth.user]);

	if (loading) return (
		<div>Loading...</div>
	);

	else if (!loading && !authorized) return (
		<div>Anda tidak diizinkan masuk ke halaman ini.</div>
	);

	else return (
		<div className={styles.AdminLayout}>
			<AdminSidebar />
			<div className={styles.AdminPageContainer}>
				{props.children}
			</div>

		</div>
	);
}