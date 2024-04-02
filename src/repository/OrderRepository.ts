import AuthUtils from "@/utils/AuthUtils";

export class OrderRepository {

	// Order a book
	public static async orderBook(bookId: number) {

		const authToken = AuthUtils.getToken();

		const response = await fetch(process.env.NEXT_PUBLIC_API_URL! + `/book/${bookId}/order`, {
			method: "POST",
			headers: {
				'Authorization': 'Bearer ' + authToken,
			}
		});
		const json = await response.json();
		return {
			error: json.error,
			message: json.message,
		};

	} // orderBook

	// Get orders of a user
	public static async getUserOrders() {

		const authToken = AuthUtils.getToken();

		const response = await fetch(process.env.NEXT_PUBLIC_API_URL! + `/order/user`, {
			method: "GET",
			headers: {
				'Authorization': 'Bearer ' + authToken,
			}
		});
		const json = await response.json();
		return {
			error: json.error,
			message: json.message,
			data: json.data,
		};

	} // orderBook

	// Cancel an order
	public static async cancelOrder(orderId: number) {

		const authToken = AuthUtils.getToken();

		const response = await fetch(process.env.NEXT_PUBLIC_API_URL! + `/order/${orderId}`, {
			method: "DELETE",
			headers: {
				'Authorization': 'Bearer ' + authToken,
			}
		});
		const json = await response.json();
		return {
			error: json.error,
			message: json.message,
			data: json.data,
		};

	} // orderBook

}