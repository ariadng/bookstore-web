"use client";

import classNames from "classnames";
import styles from "./style.module.scss";
import { useEffect, useState } from "react";
import { usePopper } from "react-popper";
import Constants from "@/utils/Constants";
import { StepperInput } from "@/ui";

export default function GuestsField(props: {
	value: number | null;
	setValue: Function;
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
					[styles.Filled]: props.value && props.value > 0
				})}>
					{props.value && props.value > 0 ? `${props.value} orang`: "Kapasitas"}
				</span>
			</button>

			{active && <div ref={setPopperElement} className={classNames(styles.Dropdown)} style={{
				...popperStyles.popper,
				zIndex: 4000,
			}} {...attributes.popper}>

				<span>Jumlah tamu</span>
				<StepperInput value={0} max={20} onChange={(newVal) => props.setValue(newVal)} />

			</div>}
		</div>
	);
}