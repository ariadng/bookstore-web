export class PriceUtils {

	public static formatPrice(price: number): string {
		return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(price);
	}

}