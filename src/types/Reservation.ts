import { DateTime } from "luxon";
import Customer from "./Customer";
import { DateTimeUtils } from "@/utils/DateTimeUtils";
import { PriceUtils } from "@/utils/PriceUtils";

interface ReservationProps {
	id?: string;
	checkIn: string;
	checkOut: string;
	price_breakdown: string;
	price_total: number;
	listing_id: string;
	listing_snapshot: string;
	expired_at: string;
	customer: Customer | null;
	payment_status: string | null;
	billing_id: number | null;
	payment_link: string | null;
	payment_data: any | null;
	created_at: string;
}

export default class Reservation {
	id: string | null;
	checkIn: DateTime;
	checkOut: DateTime;
	price_breakdown: [string, string][];
	price_total: number;
	listing_id: string;
	listing_snapshot: any;
	expired_at: DateTime;
	customer: Customer | null;
	payment_status: string | null;
	billing_id: number | null;
	payment_link: string | null;
	payment_data: any | null;
	created_at: DateTime | null;

	constructor(data: any) {
		this.id = data.id || null;
		this.checkIn = DateTimeUtils.convertStringToDateTime(data.checkIn)!;
		this.checkOut = DateTimeUtils.convertStringToDateTime(data.checkOut)!;
		this.customer = data.customer ? JSON.parse(data.customer) : null;
		this.price_breakdown = JSON.parse(data.price_breakdown);
		this.price_total = data.price_total;
		this.listing_id = data.listing_id;
		this.listing_snapshot = JSON.parse(data.listing_snapshot);
		this.expired_at = DateTimeUtils.convertStringToDateTime(data.expired_at)!;
		this.payment_status = data.payment_status;
		this.billing_id = data.billing_id;
		this.payment_link = data.payment_link;
		this.payment_data = data.payment_data ? JSON.parse(data.payment_data) : null;
		this.created_at = data.created_at ? DateTimeUtils.convertStringToDateTime(data.created_at) : null;
	}

	isPaid (): boolean {
		return this.payment_status ? true : false;
	}

	isExpired (): boolean {
		return this.expired_at.toMillis() <= DateTime.now().toMillis();
	}

	get code () {
		return this.id?.split("-")[0].toUpperCase() || "-";
	}

	get duration () {
		return DateTimeUtils.getDaysBetween(this.checkIn, this.checkOut);
	}

	get status () {
		if (this.isExpired() && !this.isPaid()) return "expired";
		if (this.isPaid()) return "paid";
		return "payment_waiting";
	}

	get formattedStatus () {
		switch (this.status) {
			case "expired":
				return "Hangus";
			case "paid":
				return "Sudah Dibayar";
			case "payment_waiting":
				return "Menunggu Pembayaran";
			default:
				return this.status;
		}
	}

	get paymentData() {
		if (!this.payment_data) return null;
		const result: any = {};

		// Method
		switch (this.payment_data.sender_bank_type) {
			case "bank_account":
				result.method = "Transfer Bank";
				break;
			case "virtual_account":
				result.method = "Virtual Account";
				break;
			case "wallet_account":
				result.method = "E-Wallet";
				break;
			default:
				result.method = this.payment_data.sender_bank_type;
				break;
		}

		// Bank
		result.bank = String(this.payment_data.sender_bank).toUpperCase();

		// Amount
		result.amount = PriceUtils.formatPrice(Number(this.payment_data.amount));

		// Payment Time
		result.time = DateTimeUtils.convertSQLStringToDateTime(this.payment_data.created_at)?.toLocaleString({
			weekday: "long",
			day: "numeric",
			month: "long",
			year: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
		})

		return result;
	}


}