import { Book } from "./Book";

export interface Order {
	id: number;
	userId: number;
	bookId: number;
	price: number;
	book?: Book;
}