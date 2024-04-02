"use client";

import OrderGrid from "@/components/OrderGrid/component";
import { useAuth } from "@/context/AuthContext";
import { OrderRepository } from "@/repository/OrderRepository";
import { Order } from "@/types/Order";
import { useCallback, useEffect, useState } from "react";

export default function OrdersPage() {

	const { user } = useAuth();
	const [ orders, setOrders ] = useState<Order[]>([]);

	const loadOrders = useCallback(async () => {
		if (user) {
			const { error, message, data } = await OrderRepository.getUserOrders();
			if (error) alert(message);
			else setOrders(data);
		}
	}, [user]);

	useEffect(() => {
		loadOrders();
	}, [user]);

	return (
		<div className="h-full overflow-auto bg-stone-100">

			<h1 className="p-10 text-4xl font-bold text-stone-800">
				My Orders
			</h1>

			<div className="px-5 pb-10">
				<OrderGrid data={orders} />
			</div>
		</div>
	)

}