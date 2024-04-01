"use client";

import styles from "./styles/style.module.scss";
import BookingOptions from "@/types/BookingOptions";
import { DateTimeUtils } from "@/utils/DateTimeUtils";
import { Button } from "@/ui";
import { PriceUtils } from "@/utils/PriceUtils";
import DatesField from "./fields/DatesField/component";
import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import ListingView from "@/types/ListingView";

export default function BookingBox(props: {
	listing: ListingView;
	options: BookingOptions;
	setOptions: Function;
}) {

	const router = useRouter();
	const pathname = usePathname();

	const canBook = useCallback(() => {
		return props.options.checkIn && props.options.checkOut;
	}, [props.options]);

	const handleBooking = useCallback(() => {
		const bookingOptions: any = {};
		if (canBook()) {
			bookingOptions.checkIn = props.options.checkIn;
			bookingOptions.checkOut = props.options.checkOut;
			bookingOptions.guests = props.options.guests ? props.options.guests : 2;
		}
		const params = new URLSearchParams(bookingOptions).toString();
		router.push(pathname + "/book?" + params);
	}, [props.options]);

	return (
		<div className={styles.BookingBox}>
			<div className={styles.Box}>
				<DatesField listing={props.listing} options={props.options} setDates={(dates: (string|null)[]) => { props.setOptions({...props.options, checkIn: dates[0], checkOut: dates[1]}) }} />
				<div className={styles.Actions}>
					<Button label="Pesan" color="primary" width="full" onClick={() => handleBooking()} disabled={!canBook()} />
				</div>
				<div className={styles.Pricing}>
					<div className={styles.Row}>
						<div className={styles.Label}>Durasi</div>
						<div className={styles.Value}>{DateTimeUtils.getDaysBetween(props.options.checkIn!, props.options.checkOut!)} malam</div>
					</div>
					<div className={styles.Row}>
						<div className={styles.Label}>Harga rata-rata</div>
						<div className={styles.Value}>
							{PriceUtils.formatPrice(props.listing.rate.nightly)}
							<span> / malam</span>
						</div>
					</div>
					<div className={styles.Row}>
						<div className={styles.Label}>Total</div>
						<div className={styles.Value}>
							{PriceUtils.formatPrice(props.listing.rate.nightly * DateTimeUtils.getDaysBetween(props.options.checkIn!, props.options.checkOut!))}
						</div>
					</div>
				</div>
			</div>
		</div>
	)

}