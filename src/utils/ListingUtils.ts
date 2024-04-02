import ListingView from "@/types/ListingView";
import listings from "@/data/listings.json";
import { Book } from "@/types/Book";

export default class ListingUtils {

	public static async index(options?: {
		page?: number;
		countPerPage?: number;
	}): Promise<Book[]> {
		const optionsParams = new URLSearchParams({
			page: options && options.page ? String(options.page) : 1,
			countPerPage: options && options.countPerPage ? String(options.countPerPage) : 12,
		} as any).toString();
		const response = await fetch(process.env.NEXT_PUBLIC_API_URL! + "/book?" + optionsParams);
		const json = await response.json();

		if (json.error) return [];
		return json.data;
	}

	public static async search(
		params: { [key: string]: string },
		options?: {
			page?: number;
			countPerPage?: number;
		}
	): Promise<Book[]> {
		
		const searchParams = new URLSearchParams({
			...params, ...({
				page: options && options.page ? String(options.page) : 1,
				countPerPage: options && options.countPerPage ? String(options.countPerPage) : 12,
			} as any)}).toString();

		const response = await fetch(process.env.NEXT_PUBLIC_API_URL! + "/book/search?" + searchParams);
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