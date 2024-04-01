export interface User {
	name: string;
	email: string;
	roles: string[];
	phone?: string;
	photo?: string;
	bio?: string;
	payout?: string;
}