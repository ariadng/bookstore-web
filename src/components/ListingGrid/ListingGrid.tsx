"use client";

import * as _ from "lodash";
import { OrderRepository } from "@/repository/OrderRepository";
import styles from "./styles/style.module.scss";
import { Book } from "@/types/Book";
import { Button } from "@/ui";
import { useAuth } from "@/context/AuthContext";
import { UIEventHandler, useEffect, useMemo, useRef, useState } from "react";
import { LoadingSpinner } from "@/ui/LoadingSpinner";
import ListingUtils from "@/utils/ListingUtils";

export default function ListingGrid(props: {
	searchParams?: { [key: string]: string };
	countPerPage: number;
}) {

	const { refreshUser, isAuthenticated } = useAuth();
	const containerRef = useRef<HTMLDivElement>(null);

	const [ data, setData ] = useState<Book[]>([]);
	const [ loading, setLoading ] = useState<boolean>(true);
	const [ lastAttempt, setLastAttempt ] = useState<boolean>(false);

	const currentPage = useMemo(() => {
		return Math.ceil(data.length / props.countPerPage);
	}, [data, props.countPerPage]);

	const loadData = async () => {
		let items: Book[] = [];
		if (!props.searchParams) {
			items = await ListingUtils.index({ countPerPage: props.countPerPage });
		}
		else {
			items = await ListingUtils.search(props.searchParams, { countPerPage: props.countPerPage });
		}
		setData(items);
		setLoading(false);
	};

	const orderBook = async (bookId: number) => {
		
		if (await isAuthenticated()) {
			const { error, message } = await OrderRepository.orderBook(bookId);
			alert(message);
			if (!error) refreshUser();
		} else {
			alert("Please login/register to order a book.")
		}

	};

	const handleScroll: UIEventHandler<HTMLDivElement> = (event) => {
		const scrollHeight = event.currentTarget.scrollHeight;
		const scrollAmount = event.currentTarget.scrollTop + event.currentTarget.clientHeight;
		const scrollProgress = Math.ceil(scrollAmount / scrollHeight * 100); // 0 - 100

		if (!loading && (scrollProgress >= 80) && !lastAttempt) {
			loadMore();
		}
	};
	
	const loadMore = _.throttle(async () => {
		setLoading(true);

		let items: Book[] = [];
		if (!props.searchParams) {
			items = await ListingUtils.index({ page: currentPage + 1, countPerPage: props.countPerPage });
		}
		else {
			items = await ListingUtils.search(props.searchParams, { page: currentPage + 1, countPerPage: props.countPerPage });
		}

		if (items.length === 0) {
			setLoading(false);
			setLastAttempt(true);
			return;
		}
		
		// This timeout is just for UI purposes to show the infinite scrolling implementation
		setTimeout(() => {
			const newData = _.uniqBy([...data, ...items], "id");
			setData(newData);
			setLoading(false);
		}, 1000);

	}, 1000);

	useEffect(() => {
		loadData();
	}, [props.searchParams]);

	return (
		<div ref={containerRef} className={styles.ListingGrid} onScroll={handleScroll}>

			{loading && (
				<div className={styles.LoadingSpinner}>
					<LoadingSpinner />
					<span>Loading</span>
				</div>
			)}

			{data.map(item => (
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