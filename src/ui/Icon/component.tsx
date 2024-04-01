import localFont from "next/font/local";
import classNames from "classnames";
import styles from "./style.module.scss";

const materialSymbols = localFont({
	variable: "--font-icon",
	src: "./fonts/rounded.woff2",
	weight: "400",
	display: "block",
	preload: true,
})

interface Props {
	name: string;
	className?: string;
}

export function Icon ({
	name,
	className,
}: Props) {
	return (
		<span className={classNames(
			materialSymbols.variable,
			styles.Icon,
			className,
		)}>{name}</span>
	)
}