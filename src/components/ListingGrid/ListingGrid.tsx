"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import styles from "./styles/style.module.scss";
import Link from "next/link";
import { PriceUtils } from "@/utils/PriceUtils";
import { Book } from "@/types/Book";
import { Button } from "@/ui";

export default function ListingGrid(props: {
	data: Book[];
}) {
	return (
		<div className={styles.ListingGrid}>
			{props.data.map(item => (
				<div
					key={item.id}
					className={styles.ListingItem}
				>
					<span className={styles.Photos}>
						{(item.cover && item.cover !== "") ? <img src={item.cover} alt={item.title ?? ""} loading="lazy" /> : <span className={styles.Placeholder} />}
					</span>
					<span className={styles.Title}>
						{item.title}
					</span>
					<span className={styles.Price}>
						<Button label={`Order for ${item.price} coins`} width="full" color="primary" size="small" />
					</span>
					<span className={styles.Info}>
						{item.description}
					</span>
				</div>
			))}
		</div>
	)
}