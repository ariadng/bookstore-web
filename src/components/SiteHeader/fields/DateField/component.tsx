"use client";

import classNames from "classnames";
import styles from "./style.module.scss";
import { useEffect, useState } from "react";
import { usePopper } from "react-popper";
import { DateSelector } from "@/ui";
import { DateTimeUtils } from "@/utils/DateTimeUtils";

export default function DateField(props: {
	values: string[] | null;
	setValues: Function;
}) {

	const [ containerElement, setContainerElement ] = useState<HTMLDivElement | null>(null);
	const [ referenceElement, setReferenceElement ] = useState<HTMLButtonElement | null>(null);
	const [ popperElement, setPopperElement ] = useState<HTMLDivElement | null>(null);

	const [ active, setActive ] = useState<boolean | null>(null);

	const { attributes, styles: popperStyles, state } = usePopper(referenceElement, popperElement, {
		placement: "bottom",
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
	
	return (
		<div ref={setContainerElement} className={styles.FieldContainer}>

			<button ref={setReferenceElement} className={styles.Field} onClick={() => setActive(!active)}>
				<span className={classNames(styles.Display, {
					[styles.Filled]: props.values && props.values.length == 2
				})}>
					{props.values && props.values[0] && props.values[1] ? "Tanggal " + DateTimeUtils.formatDateRange(
						DateTimeUtils.convertStringToDateTime(props.values[0])!,
						DateTimeUtils.convertStringToDateTime(props.values[1])!
					) : "Tanggal"}
				</span>
			</button>

			{active && <div ref={setPopperElement} className={classNames(styles.Dropdown)} style={{
				...popperStyles.popper,
				zIndex: 4000,
			}} {...attributes.popper}>

				<DateSelector
					ranged={true}
					min={DateTimeUtils.getTodayString()}
					values={props.values ? props.values : [null, null]}
					onChange={(newVal) => {
						props.setValues(newVal);
						if (newVal[0] && newVal[1]) setActive(false);
					}}
				/>

			</div>}
		</div>
	);
}