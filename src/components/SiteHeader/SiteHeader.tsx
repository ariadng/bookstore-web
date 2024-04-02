"use client";

import classNames from "classnames";
import styles from "./styles/style.module.scss";
import Link from "next/link";
import TypeField from "./fields/TypeField/component";
import { useCallback, useEffect, useState } from "react";
import GuestsField from "./fields/GuestsField/component";
import DateField from "./fields/DateField/component";
import Filter from "@/types/Filter";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { User } from "@/types/User";
import AuthUtils from "@/utils/AuthUtils";
import GuestMenu from "./components/GuestMenu/component";
import UserMenu from "./components/UserMenu/component";
import { Button, Icon } from "@/ui";
import { useAuth } from "@/context/AuthContext";

export default function SiteHeader() {

	const { user } = useAuth();
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const [ filter, setFilter ] = useState<Filter>({});
	const [ searchQuery, setSearchQuery ] = useState<string>(searchParams.get("query") ?? "");

	const handleSearch = useCallback(() => {
		const sp = new URLSearchParams({
			query: searchQuery,
		}).toString();
		router.push("/?" + sp);
	}, [filter, searchQuery]);

	const resetSearch = useCallback(() => {
		setSearchQuery("");
		router.push("/");
	}, []);

	useEffect(() => {
		setSearchQuery(searchParams.get("query") ?? "");
	}, [searchParams]);

	return (
		<div className={classNames(styles.SiteHeader)}>
			
			<div className={styles.Brand}>
				<Link href="/">
					<img src="/bookflix.svg" />
				</Link>
			</div>

			<div className={styles.Search}>
				<div className={styles.SearchForm}>
					
					<input className={styles.QueryInput} placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.currentTarget.value)} onKeyUp={(e) =>{ if (e.key === "Enter") handleSearch() }} />
					{searchParams.has("query") && <button className={styles.ResetButton} onClick={() => resetSearch()}>
						<Icon name="close" className="text-stone-700" />
					</button>}
					<button className={styles.SearchButton} onClick={() => handleSearch()}>
						<img src="/icons/search_white.svg" />
					</button>
				</div>
			</div>

			<div className={styles.Actions}>
				{user && <>
					<div className={styles.Points}>
						<span className={styles.Value}>{user.points}</span>
						<span className={styles.Label}>Points</span>
					</div>
					<UserMenu user={user} />
				</>}

				{!user && <>
					<Button href="/register" label="Register" size="small" />
					&nbsp;
					<Button href="/login" label="Login" size="small" color="dark" />
				</>}
			</div>

		</div>
	);
}