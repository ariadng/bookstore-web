"use client";

import { User } from "@/types/User";

export default class AuthUtils {

	public static getToken(): string | null {
		const token = localStorage.getItem("token");
		if (!token) return null;
		return token;
	}

	public static setToken(token: string): void {
		localStorage.setItem("token", token);
	}

	public static async getUser(token?: string): Promise<User | null> {
		const authToken = token ?? AuthUtils.getToken();
		if (!authToken) return null;

		const response = await fetch(process.env.NEXT_PUBLIC_API_URL! + "/profile", {
			method: "GET",
			headers: {
				'Authorization': 'Bearer ' + authToken,
			}
		});
		const json = await response.json();
		if (!json.error && json.data) {
			return json.data as User;
		} else {
			localStorage.removeItem("token");
		}
		return null;
	}

	public static async isAuthenticated(token?: string) {
		return (await AuthUtils.getUser(token)) !== null;
	}

	public static async isAdmin() {
		const token = AuthUtils.getToken();
		if (!token) return false;

		const user = await AuthUtils.getUser(token);
		if (!user) return false;

		return user.roles.includes("admin");
	}

	public static async logout() {
		localStorage.removeItem("token");
	}

}