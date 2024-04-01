"use client";

import Link from "next/link";
import styles from "./styles/style.module.scss";

export function GoogleLoginButton() {
	return (
		<Link href={process.env.NEXT_PUBLIC_API_URL + "/auth/google"} className={styles.GoogleLoginButton}>
			<img className={styles.Icon} src="/logo/google-g.svg" />
			<span className={styles.Label}>Lanjutkan dengan Google</span>
		</Link>	
	);
}