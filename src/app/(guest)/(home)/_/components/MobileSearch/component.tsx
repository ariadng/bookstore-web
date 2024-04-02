"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Icon } from "@/ui";
import styles from "./styles/style.module.scss";

export function MobileSearch() {

	const searchParams = useSearchParams();
	const router = useRouter();
	const [searchQuery, setSearchQuery] = useState<string>(searchParams.get("query") ?? "");

	const handleSearch = useCallback(() => {
		const searchParams = new URLSearchParams({
			query: searchQuery,
		}).toString();
		router.push("/?" + searchParams);
	}, [searchQuery]);

	const resetSearch = useCallback(() => {
		setSearchQuery("");
		router.push("/");
	}, []);

	useEffect(() => {
		setSearchQuery(searchParams.get("query") ?? "");
	}, [searchParams]);

	return (
		<div className={styles.MobileSearch}>
			<div className={styles.SearchForm}>

				<input className={styles.QueryInput} placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.currentTarget.value)} onKeyUp={(e) => { if (e.key === "Enter") handleSearch() }} />
				{searchParams.has("query") && <button className={styles.ResetButton} onClick={() => resetSearch()}>
					<Icon name="close" className="text-stone-700" />
				</button>}
				<button className={styles.SearchButton} onClick={() => handleSearch()}>
					<img src="/icons/search_white.svg" />
				</button>
			</div>
		</div>
	);

}