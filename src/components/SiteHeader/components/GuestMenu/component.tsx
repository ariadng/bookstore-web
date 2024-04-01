"use client";

import { UserPhoto } from "@/ui/UserPhoto";
import styles from "./styles/style.module.scss";
import { User } from "@/types/User";
import { Icon } from "@/ui";
import { useCallback, useEffect, useState } from "react";
import { usePopper } from "react-popper";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classNames from "classnames";

export default function GuestMenu() {

	const pathname = usePathname();

	const [containerElement, setContainerElement] = useState<HTMLDivElement | null>(null);
	const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null);
	const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);

	const [active, setActive] = useState<boolean | null>(null);

	const { attributes, styles: popperStyles, state } = usePopper(referenceElement, popperElement, {
		placement: "bottom-end",
		modifiers: [
			{
				name: "offset",
				options: { offset: [0, 4] }
			},
			{
				name: 'preventOverflow',
				options: {
					altAxis: true,
					rootBoundary: "viewport",
					altBoundary: true
				},
			},
		]
	});

	const isMenuActive = useCallback((path: string) => {
		if (path === "/") return pathname === "/";
		return pathname.includes(path);
	}, [pathname]);

	useEffect(() => {
		function handleClickOutside(e: any) {
			const target = e.target as Node;
			if (containerElement) {
				if (!containerElement.contains(target)) setActive(null);
			}
		}
		if (containerElement) document.addEventListener("click", handleClickOutside);
		return () => document.removeEventListener("click", handleClickOutside);
	}, [containerElement]);

	useEffect(() => {
		setActive(false);
	}, [pathname]);

	return (
		<div ref={setContainerElement} className={styles.GuestMenu}>

			<button ref={setReferenceElement} className={styles.MenuBadge} onClick={() => setActive(!active)}>
				<Icon className={styles.MenuIcon} name={active ? "close" : "menu"} />
				<span className={styles.Label}>Menu</span>
			</button>

			{active && <div ref={setPopperElement} className={styles.Dropdown} style={{
				...popperStyles.popper,
				zIndex: 4000,
			}} {...attributes.popper}>

				<Link href="/" className={classNames(styles.DropdownItem, { [styles.Active]: isMenuActive("/") })}>
					<span>Beranda</span>
					<Icon className={styles.DropdownItemIcon} name="home" />
				</Link>
				<Link href="/about" className={classNames(styles.DropdownItem, { [styles.Active]: isMenuActive("/about") })}>
					<span>Tentang Restay</span>
					<Icon className={styles.DropdownItemIcon} name="info" />
				</Link>
				<Link href="/help" className={classNames(styles.DropdownItem, { [styles.Active]: isMenuActive("/help") })}>
					<span>Bantuan</span>
					<Icon className={styles.DropdownItemIcon} name="contact_support" />
				</Link>

				<div className={styles.Separator}></div>

				<Link href="/login" className={styles.DropdownItem}>
					<span>Login / Daftar</span>
					<Icon className={styles.DropdownItemIcon} name="person" />
				</Link>

			</div>}

		</div>
	);

}