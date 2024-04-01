"use client";

import { ReactNode, useEffect, useState } from "react";
import styles from "./_/styles/style.module.scss";
import { Button, Icon } from "@/ui";
import { usePathname } from "next/navigation";
import { Listing } from "@/types/Listing";
import AdminListingUtils from "@/utils/admin/AdminListingUtils";

import listingdummy from "@/data/listings.json";
import Link from "next/link";
import classNames from "classnames";

export default function AdminListingLayout(props: {
	children?: ReactNode;
}) {

	const pathname = usePathname();

	const [ loading, setLoading ] = useState<boolean>(true);
	const [ listingItems, setListingItems ] = useState<any[]>(listingdummy);

	const loadListing = async () => {
		setLoading(true);
		setListingItems(await AdminListingUtils.index());
		setLoading(false);
	};

	useEffect(() => {
		// if (pathname.includes("/admin/listing")) loadListing();
	}, [pathname]);

	return (
		<div className={styles.AdminListingLayout}>
			
			<div className={styles.ParentContainer}>
				
				<div className={styles.Header}>
					<Icon className={styles.Icon} name="real_estate_agent" />
					<div className={styles.Title}>
						Listing Properti
					</div>
					<div className={styles.Actions}>
						<Button icon="filter_alt" size="small" />
						<Button icon="refresh" size="small" />
						<Button icon="add" size="small" color="dark" href="/admin/listing/create" disabled={pathname === "/admin/listing/create"} />
					</div>
				</div>

				<div className={styles.Body}>
					
					{listingItems.length > 0 && (
						<div className={styles.List}>
							{listingItems.map(item => (
								<Link className={classNames(styles.ListItem, {
									[styles.Active]: pathname === ("/admin/listing/" + item.id)
								})} key={item.id} href={"/admin/listing/" + item.id}>
									<div className={styles.Photo}>
										<img src={item.thumbnails[0]} />
									</div>
									<div className={styles.Text}>
										<div className={styles.Title}>{item.title}</div>
										<div className={styles.Info}>{item.category} at {item.location.short}</div>
									</div>
								</Link>
							))}
						</div>
					)}

				</div>

			</div>
			
			<div className={styles.ChildContainer}>
				{props.children}
			</div>

		</div>
	);

}