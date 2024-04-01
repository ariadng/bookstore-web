import { Order } from "./Order";

export interface User {
	id: number;
	email: string;
	password?: string;
	name: string;
	points: number;
	orders?: Order[];
}