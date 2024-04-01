"use client";

import classNames from "classnames";
import styles from "./styles/style.module.scss";
import Link from "next/link";
import TypeField from "./fields/TypeField/component";
import { useCallback, useEffect, useState } from "react";
import GuestsField from "./fields/GuestsField/component";
import DateField from "./fields/DateField/component";
import Filter from "@/types/Filter";
import { usePathname, useRouter } from "next/navigation";
import { User } from "@/types/User";
import AuthUtils from "@/utils/AuthUtils";
import GuestMenu from "./components/GuestMenu/component";
import UserMenu from "./components/UserMenu/component";

export default function SiteHeader() {

	const router = useRouter();
	const pathname = usePathname();

	const [ filter, setFilter ] = useState<Filter>({});
	const [ user, setUser ] = useState<User|null>(null);

	const handleSearch = useCallback(() => {
		let params: any = {};
		if (filter.type) params.type = filter.type;
		if (filter.guests) params.guests = filter.guests;
		if (filter.dates && filter.dates[0] && filter.dates[1]) {
			params.dateFrom = filter.dates[0];
			params.dateTo = filter.dates[1];
		}
		const searchParams = new URLSearchParams(params).toString();
		router.push("/?" + searchParams);
	}, [filter]);

	const checkAuth = useCallback(async () => {
		setUser(await AuthUtils.getUser());
	}, [pathname]);

	useEffect(() => {
		checkAuth();
	}, [pathname]);

	return (
		<div className={classNames(styles.SiteHeader)}>
			
			<div className={styles.Brand}>
				<Link href="/">
					<img src="/bookflix.svg" />
				</Link>
			</div>

			<div className={styles.Search}>
				<div className={styles.SearchForm}>
					
					<input className={styles.QueryInput} placeholder="Search..." />
					<button className={styles.SearchButton} onClick={() => handleSearch()}>
						<img src="/icons/search_white.svg" />
					</button>
				</div>
			</div>

			<div className={styles.Actions}>
				{user && <>
					<UserMenu user={user} />
				</>}

				{!user && <>
					<GuestMenu />
				</>}
			</div>

		</div>
	);
}