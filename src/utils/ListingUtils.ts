import ListingView from "@/types/ListingView";
import listings from "@/data/listings.json";
import { Book } from "@/types/Book";

export default class ListingUtils {

	public static async index(): Promise<Book[]> {
		const response = await fetch(process.env.NEXT_PUBLIC_API_URL! + "/book?countPerPage=30");
		const json = await response.json();

		if (json.error) return [];
		return json.data;
	}

	public static async search(params: { [key: string]: string }): Promise<Book[]> {
		const searchParams = new URLSearchParams(params).toString();
		const response = await fetch(process.env.NEXT_PUBLIC_API_URL! + "/search?" + searchParams);
		const json = await response.json();

		if (json.error) return [];
		return json.data;
	}

	public static async get(listingId: string): Promise<ListingView | null> {
		return new Promise((resolve) => {
			const listing = listings.find(row => row.id === listingId);
			resolve(listing ? listing as ListingView : null);
		});
	}

} // class