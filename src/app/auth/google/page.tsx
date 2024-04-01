"use client";

import AuthUtils from "@/utils/AuthUtils";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";

function SuspendedGoogleAuthPage() {

	const searchParams = useSearchParams();
	const router = useRouter();
	const [ loginFailed, setLoginFailed ] = useState<boolean>(false);

	const handleToken = useCallback(async () => {
		const token = searchParams.get("token");
		if (token) {
			AuthUtils.setToken(token);
			if (await AuthUtils.isAuthenticated(token)) {
				router.replace("/");
			} else {
				setLoginFailed(true);
			}
		}
	}, [searchParams]);

	useEffect(() => {
		handleToken();
	}, [searchParams]);

	if (!searchParams.get("token")) return (
		<div>Login gagal [NO_TOKEN]</div>
	);

	if (loginFailed) return (
		<div>Login gagal [TOKEN_INVALID]</div>
	);

	return (
		<div>Login...</div>
	);

}

export default function GoogleAuthPage() {

	return (
		<Suspense>
			<SuspendedGoogleAuthPage />
		</Suspense>
	);

}