"use client";

import { OrderRepository } from "@/repository/OrderRepository";
import styles from "./styles/style.module.scss";
import { Button } from "@/ui";
import { useAuth } from "@/context/AuthContext";
import { Order } from "@/types/Order";

export default function OrderGrid(props: {
	data: Order[];
}) {

	const { refreshUser, isAuthenticated } = useAuth();

	const cancelOrder = async (orderId: number) => {
		
		if (await isAuthenticated()) {
			const confirmed = confirm("Are you sure want to cancel this order?");
			if (confirmed) {
				const { error, message } = await OrderRepository.cancelOrder(orderId);
				alert(message);
				refreshUser();
			}
		} else {
			alert("Please login/register to order a book.")
		}

	};

	return (
		<div className={styles.OrderGrid}>
			{props.data.map(item => (
				<div
					key={item.id}
					className={styles.ListingItem}
				>
					{item.book && <>
						<span className={styles.Photos}>
							{(item.book.cover && item.book.cover !== "") ? <img src={item.book.cover} alt={item.book.title ?? ""} loading="lazy" /> : <span className={styles.Placeholder} />}
						</span>
						<span className={styles.Title}>
							{item.book.title}
						</span>
						<span className={styles.Bought}>
							You ordered this book for <strong>{item.price} points</strong>
						</span>
						<span className={styles.Info}>
							{item.book.description}
						</span>
						<span className={styles.Price}>
							<Button label={`Cancel Order`} width="full" color="danger" onClick={() => cancelOrder(item.id)} />
						</span>
					</>}
				</div>
			))}
		</div>
	)
}