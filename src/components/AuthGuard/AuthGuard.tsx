"use client";

import AuthUtils from "@/utils/AuthUtils";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useCallback, useEffect, useState } from "react";

export function AuthGuard (props: {
	mode: "guest" | "auth";
	children?: ReactNode;
}) {

	const router = useRouter();
	const pathname = usePathname();
	const [ loading, setLoading ] = useState<boolean>(true);

	const checkAuthentication = useCallback(async () => {
		if (props.mode === "guest" && (await AuthUtils.isAuthenticated())) router.push("/"); 
		if (props.mode === "auth" && !(await AuthUtils.isAuthenticated())) router.push("/login");
		setTimeout(() => {
			setLoading(false);
		}, 500);
	} ,[pathname]);

	useEffect(() => {
		checkAuthentication();
	}, [pathname]);

	if (loading) return <></>;
	return props.children ?? <></>;

}