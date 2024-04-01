"use client";

import AuthUtils from "@/utils/AuthUtils";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect } from "react";

export default function LogoutPage() {
	
	const pathname = usePathname();
	const router = useRouter();

	const handleLogout = useCallback(async () => {
		await AuthUtils.logout();
		router.replace("/");
	}, [pathname]);

	useEffect(() => {
		handleLogout();
	}, [pathname]);
	
	return (
		<></>
	);
}