"use client";

import { MouseEventHandler } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import classNames from "classnames";
import styles from "./styles/style.module.scss";
import { Icon, LoadingSpinner } from "@/ui";

interface Props {
	href: string;
	label: string;
	icon: string;
	loading?: boolean;
	onClick?: Function;
}

export function SidebarMenuItem({
	href, label, icon,
	loading,
	onClick,
}: Props) {

	const pathname = usePathname();
	const router = useRouter();

	const handleClickEvent: MouseEventHandler<HTMLAnchorElement> = (event) => {
		event.preventDefault();
		if (onClick) onClick();
		setTimeout(() => {
			router.push(href);
		}, 300);
	};

	return (
		<Link
			className={classNames(
				styles.SidebarMenuItem,
				{ [styles.Active]: pathname.includes(href) }
			)}
			href={href}
			onClick={handleClickEvent}
		>
			<Icon name={icon} className={styles.Icon} />
			<span className={styles.Label}>{label}</span>
			{loading && <LoadingSpinner className={styles.Spinner} />}
		</Link>
	);
}