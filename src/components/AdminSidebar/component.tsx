"use client";

import { useAuth } from "@/context/AuthContext";
import UserMenu from "../SiteHeader/components/UserMenu/component";
import styles from "./styles/style.module.scss";
import { SidebarMenuItem } from "./components";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function AdminSidebar() {

	const auth = useAuth();
	const pathname = usePathname();

	const [ loadingMenuItem, setLoadingMenuItem ] = useState<string | null>(null);

	const loadPage = (href: string) => {
		if (!pathname.includes(href) && !href.includes(pathname)) setLoadingMenuItem(href);
	};

	useEffect(() => {
		setLoadingMenuItem(null);
	}, [pathname]);

	return (
		<div className={styles.AdminSidebar}>
			
			<div className={styles.Header}>
				<div className={styles.Brand}>
					<img src="/logo/restay-square.svg" alt="Restay" />
				</div>
				<div className={styles.Title}>
					Admin Panel
				</div>
				<div className={styles.Actions}>
					{auth.user && <UserMenu user={auth.user} />}
				</div>
			</div>

			<div className={styles.MenuContainer}>

				<div className={styles.MenuSection}>
					<div className={styles.MenuSectionTitle}>Bisnis</div>
					<div className={styles.MenuSectionList}>
						<SidebarMenuItem icon="order_approve" label="Reservasi" href="/admin/reservations" loading={loadingMenuItem === "/admin/reservations"} onClick={() => loadPage("/admin/reservations")} />
						<SidebarMenuItem icon="payments" label="Pembayaran" href="/admin/payments" loading={loadingMenuItem === "/admin/payments"} onClick={() => loadPage("/admin/payments")} />
						<SidebarMenuItem icon="calendar_today" label="Kalender" href="/admin/calendar" loading={loadingMenuItem === "/admin/calendar"} onClick={() => loadPage("/admin/calendar")} />
					</div>
				</div>

				<div className={styles.MenuSection}>
					<div className={styles.MenuSectionTitle}>Listing</div>
					<div className={styles.MenuSectionList}>
						<SidebarMenuItem icon="real_estate_agent" label="Listing Properti" href="/admin/listing" loading={loadingMenuItem === "/admin/listing"} onClick={() => loadPage("/admin/listing")} />
						<SidebarMenuItem icon="self_care" label="Fasilitas" href="/admin/facilities" loading={loadingMenuItem === "/admin/facilities"} onClick={() => loadPage("/admin/facilities")} />
						<SidebarMenuItem icon="domain" label="Lokasi & Bangunan" href="/admin/real-estate" loading={loadingMenuItem === "/admin/real-estate"} onClick={() => loadPage("/admin/real-estate")} />
					</div>
				</div>

				<div className={styles.MenuSection}>
					<div className={styles.MenuSectionTitle}>Pengaturan</div>
					<div className={styles.MenuSectionList}>
						<SidebarMenuItem icon="face" label="Pengguna" href="/admin/users" loading={loadingMenuItem === "/admin/users"} onClick={() => loadPage("/admin/users")} />
						<SidebarMenuItem icon="badge" label="Staf" href="/admin/staffs" loading={loadingMenuItem === "/admin/staffs"} onClick={() => loadPage("/admin/staffs")} />
					</div>
				</div>

				<div className={styles.MenuSection}>
					<div className={styles.MenuSectionTitle}>Website</div>
					<div className={styles.MenuSectionList}>
						<SidebarMenuItem icon="web" label="Halaman" href="/admin/pages" loading={loadingMenuItem === "/admin/pages"} onClick={() => loadPage("/admin/pages")} />
						<SidebarMenuItem icon="format_paint" label="Branding" href="/admin/branding" loading={loadingMenuItem === "/admin/branding"} onClick={() => loadPage("/admin/branding")} />
						<SidebarMenuItem icon="settings" label="Pengaturan" href="/admin/website-settings" loading={loadingMenuItem === "/admin/website-settings"} onClick={() => loadPage("/admin/website-settings")} />
					</div>
				</div>

			</div>

		</div>
	)

}