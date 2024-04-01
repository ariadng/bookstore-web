"use client";

import BookingOptions from "@/types/BookingOptions";
import styles from "./styles/style.module.scss";
import { useCallback, useEffect, useState } from "react";
import ListingUtils from "@/utils/ListingUtils";
import { PriceUtils } from "@/utils/PriceUtils";
import { DateTimeUtils } from "@/utils/DateTimeUtils";
import { StringUtils } from "@/utils/StringUtils";
import classNames from "classnames";
import { Button } from "@/ui";
import ListingView from "@/types/ListingView";

export default function ListingBook(props: {
	listingId: string;
	bookingOptions: BookingOptions;
}) {

	const [ isLoadingListing, setIsLoadingListing ] = useState<boolean>(true);
	const [ listing, setListing ] = useState<ListingView | null>(null);

	const loadListing = useCallback(async () => {
		setIsLoadingListing(true);
		setListing(await ListingUtils.get(props.listingId));
		setIsLoadingListing(false);
	}, [props.listingId]);

	useEffect(() => {
		loadListing();
	}, [props.listingId]);

	if (isLoadingListing) return (
		<div>
			Loading...
		</div>
	);

	if (!isLoadingListing && !listing) return (
		<div>
			Maaf, terjadi kesalahan.
		</div>
	);

	return (
		<div className={styles.ListingBook}>
			<div className={styles.Details}>
				<div className={styles.ListingDetails}>
					<div className={styles.Photo}>
						<img src={listing!.thumbnails[0]} />
					</div>
					<div className={styles.Text}>
						<div className={styles.Title}>{listing!.title}</div>
						<div className={styles.Info}>{ listing!.category } at {listing!.location.short}</div>
					</div>
				</div>
				<div className={styles.Section}>
					<h3>Detail Pemesanan</h3>
					<div className={styles.List}>
						<div className={styles.Row}>
							<div className={styles.Label}>Check-in</div>
							<div className={styles.Value}>{StringUtils.formatDateLong(props.bookingOptions.checkIn)}</div>
						</div>
						<div className={styles.Row}>
							<div className={styles.Label}>Check-out</div>
							<div className={styles.Value}>{StringUtils.formatDateLong(props.bookingOptions.checkOut)}</div>
						</div>
						<div className={styles.Row}>
							<div className={styles.Label}>Durasi</div>
							<div className={styles.Value}>{DateTimeUtils.getDaysBetween(props.bookingOptions.checkIn!, props.bookingOptions.checkOut!)} malam</div>
						</div>
						<div className={styles.Row}>
							<div className={styles.Label}>Harga rata-rata</div>
							<div className={styles.Value}>
								{PriceUtils.formatPrice(listing!.rate.nightly)}
								<span> / malam</span>
							</div>
						</div>
						<div className={classNames(styles.Row, styles.Total)}>
							<div className={styles.Label}>Total</div>
							<div className={styles.Value}>
								{PriceUtils.formatPrice(listing!.rate.nightly * DateTimeUtils.getDaysBetween(props.bookingOptions.checkIn!, props.bookingOptions.checkOut!))}
							</div>
						</div>
					</div>
				</div>
				<div className={styles.Section}>
					<h3>Catatan</h3>
					<p>
						Login dengan akun Google milik Anda untuk melanjutkan pemesanan.
					</p>
				</div>
			</div>
			<div className={styles.Actions}>
				<Button label="Login dan pesan sekarang" width="full" color="primary" />
			</div>
		</div>
	)

}