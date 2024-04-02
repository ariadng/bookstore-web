"use client";

import { OrderRepository } from "@/repository/OrderRepository";
import styles from "./styles/style.module.scss";
import { Book } from "@/types/Book";
import { Button } from "@/ui";
import { useAuth } from "@/context/AuthContext";

export default function ListingGrid(props: {
	data: Book[];
}) {

	const { refreshUser, isAuthenticated } = useAuth();

	const orderBook = async (bookId: number) => {
		
		if (await isAuthenticated()) {
			const { error, message } = await OrderRepository.orderBook(bookId);
			alert(message);
			if (!error) refreshUser();
		} else {
			alert("Please login/register to order a book.")
		}

	};

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
						<Button label={`Order for ${item.price} coins`} width="full" color="primary" onClick={() => orderBook(item.id)} />
					</span>
					<span className={styles.Info}>
						{item.description}
					</span>
				</div>
			))}
		</div>
	)
}