"use client";

import ListingView from "@/types/ListingView";
import styles from "./styles/style.module.scss";
import BookingOptions from "@/types/BookingOptions";
import { DateTimeUtils } from "@/utils/DateTimeUtils";
import { useCallback, useEffect, useState } from "react";
import { usePopper } from "react-popper";
import { DateSelector } from "@/ui";
import classNames from "classnames";
import _ from "lodash";

export default function DatesField(props: {
	listing: ListingView;
	options: BookingOptions;
	setDates: Function;
}) {

	const [containerElement, setContainerElement] = useState<HTMLDivElement | null>(null);
	const [referenceElement, setReferenceElement] = useState<HTMLButtonElement | null>(null);
	const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);

	const [active, setActive] = useState<boolean | null>(null);

	const getValues = useCallback(() => {
		if (!props.options.checkIn || !props.options.checkOut) return [null, null];
		return [props.options.checkIn, props.options.checkOut];
	}, [props.options]);

	const [values, setValues] = useState<(string|null)[]>(getValues());

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
		if (!_.isEqual(values, getValues())) setValues(getValues());
	}, [props.options]);

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
		<div ref={setContainerElement} className={styles.DatesField}>
			<div className={styles.Label}>Tanggal menginap</div>
			<button ref={setReferenceElement} className={styles.Field} onClick={() => setActive(!active)}>
				{props.options.checkIn && props.options.checkOut ? DateTimeUtils.formatDateRange(
					DateTimeUtils.convertStringToDateTime(props.options.checkIn)!,
					DateTimeUtils.convertStringToDateTime(props.options.checkOut)!
				) : "Pilih tanggal"}
			</button>
			{active && <div ref={setPopperElement} className={classNames(styles.Dropdown)} style={{
				...popperStyles.popper,
				zIndex: 4000,
			}} {...attributes.popper}>

				<DateSelector
					ranged={true}
					min={DateTimeUtils.getTodayString()}
					values={values}
					onChange={(newVal) => {
						setValues([...newVal]);
						if (newVal[0] && newVal[1]) {
							setActive(false);
							props.setDates(newVal);
						}
					}}
				/>

			</div>}
		</div>
	)
}