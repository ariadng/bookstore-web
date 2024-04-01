import { Listing } from "@/types/Listing";

export default class AdminListingUtils {

	public static async index(): Promise<Listing[]> {
		const token = localStorage.getItem("token");
		if (!token) return [];

		const response = await fetch(process.env.NEXT_PUBLIC_API_URL! + "/admin/listing", {
			method: "GET",
			headers: {
				'Authorization': 'Bearer ' + token,
				'Content-Type': 'application/json',
			},
		});
		const json = await response.json();
		if (!json.error && json.data) {
			return Listing.fromArray(json.data);
		}
		return [];
	}

	public static async get(id: string): Promise<Listing|null> {
		const token = localStorage.getItem("token");
		if (!token) return null;

		const response = await fetch(process.env.NEXT_PUBLIC_API_URL! + "/admin/listing/" + id, {
			method: "GET",
			headers: {
				'Authorization': 'Bearer ' + token,
				'Content-Type': 'application/json',
			},
		});
		const json = await response.json();
		if (!json.error && json.data) {
			return new Listing(json.data);
		}
		return null;
	}

}