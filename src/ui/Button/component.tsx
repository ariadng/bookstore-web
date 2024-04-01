"use client";

import { MouseEventHandler } from "react";
import classNames from "classnames";
import styles from "./style.module.scss";
import Link from "next/link";
import { Icon } from "..";

export interface ButtonProps {
	className?: string;
	label?: string;
	leadingIcon?: string;
	icon?: string;
	type?: "button" | "submit";
	width?: "auto" | "full";
	size?: "normal" | "small" | "tiny";
	color?: "default" | "primary" | "primary-inverse" | "danger" | "warning" | "ghost" | "light" | "light-outlined" | "dark";
	href?: string;
	target?: "_self" | "_blank" | "_parent" | "_top";
	disabled?: boolean;
	onClick?: Function;
}

export function Button ({
	className,
	label, leadingIcon, icon,
	type = "button",
	width = "auto",
	size = "normal",
	color = "default",
	href,
	target = "_self",
	disabled = false,
	onClick,
}: ButtonProps) {

	const buttonClassName = classNames(
		styles.Button,
		[styles['_width_' + width]],
		[styles['_color_' + color]],
		[styles['_size_' + size]],
		{
			[styles['_icon_only']]: (typeof label === "undefined") && (typeof icon !== "undefined"),
			[styles['Disabled']]: disabled,
		},
		className,
	);

	const handleClick: MouseEventHandler<HTMLButtonElement|HTMLAnchorElement> = (event) => {
		if (!href) event.stopPropagation();
		if (onClick && !disabled) onClick();
	};

	const childElement = <>
		{leadingIcon && <Icon className={styles.LeadingIcon} name={leadingIcon} />}
		{label && <span className={styles.Label}>{label}</span>}
		{icon && <Icon className={styles.Icon} name={icon} />}
	</>;

	// Link
	if (href) return (
		<Link className={buttonClassName} href={href} target={target} onClick={handleClick}>
			{childElement}
		</Link>
	);

	// Button
	return (
		<button className={buttonClassName} type={type} onClick={handleClick}>
			{childElement}
		</button>
	)
}