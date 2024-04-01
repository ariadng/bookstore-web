import { DateTimeUtils } from "@/utils/DateTimeUtils";
import Coordinate from "./Coordinate";
import ListingOptions from "./ListingOptions";

export interface ListingProps {

	_id?: string | null;
	userId?: string | null;

	type?: string | null;
	space?: string | null;
	ownership?: string | null;

	coordinate?: Coordinate | null;
	geocode?: google.maps.GeocoderResult | null;
	generatedAddress?: string | null;
	street?: string | null;
	streetNumber?: string | null;
	village?: string | null;
	district?: string | null;
	city?: string | null;
	province?: string | null;
	country?: string | null;
	zipCode?: string | null;
	building?: string | null;
	addressNotes?: string | null;

	maximumGuests?: number | null;
	areaSize?: number | null;
	bedrooms?: number | null;
	bathrooms?: number | null;
	kitchen?: boolean | null;
	balcony?: boolean | null;

	photos?: { url: string, description?: string | null }[] | null;

	facilities?: { [key: string]: boolean | string | number } | null;

	dailyRent?: boolean;
	transit3Rent?: boolean;
	transitRent?: boolean;

	baseRates?: {
		daily?: {
			weekday?: number | null;
			weekend?: number | null;
			peak?: number | null;
		};
		transit?: {
			weekday?: number | null;
			weekend?: number | null;
			peak?: number | null;
		};
		transit3?: {
			weekday?: number | null;
			weekend?: number | null;
			peak?: number | null;
		};
	};

	petFriendly?: boolean;
	smokingAllowed?: boolean;

	checkInTime?: string | null;
	maxCheckInTime?: string | null;
	checkOutTime?: string | null;

	checkInInstructions?: string | null;
	checkOutInstructions?: string | null;
	additionalInfo?: string | null;

	title?: string | null;
	description?: string | null;

	status?: string | null;

	// Timestamp
	createdAt?: string | null;
	updatedAt?: string | null;

}

export class Listing {

	// Properties
	_id?: string | null;
	userId?: string | null;
	type?: string | null;
	space?: string | null;
	ownership?: string | null;
	coordinate?: Coordinate | null;
	geocode?: google.maps.GeocoderResult | null;
	generatedAddress?: string | null;
	street?: string | null;
	streetNumber?: string | null;
	village?: string | null;
	district?: string | null;
	city?: string | null;
	province?: string | null;
	country?: string | null;
	zipCode?: string | null;
	building?: string | null;
	addressNotes?: string | null;
	maximumGuests?: number | null;
	areaSize?: number | null;
	bedrooms?: number | null;
	bathrooms?: number | null;
	kitchen?: boolean | null;
	balcony?: boolean | null;
	photos?: { url: string, description?: string | null }[] | null;
	facilities?: { [key: string]: boolean | string | number } | null;
	dailyRent?: boolean;
	transit3Rent?: boolean;
	transitRent?: boolean;
	baseRates?: {
		daily?: {
			weekday?: number | null;
			weekend?: number | null;
			peak?: number | null;
		};
		transit?: {
			weekday?: number | null;
			weekend?: number | null;
			peak?: number | null;
		};
		transit3?: {
			weekday?: number | null;
			weekend?: number | null;
			peak?: number | null;
		};
	};
	petFriendly?: boolean;
	smokingAllowed?: boolean;
	checkInTime?: string | null;
	maxCheckInTime?: string | null;
	checkOutTime?: string | null;
	checkInInstructions?: string | null;
	checkOutInstructions?: string | null;
	additionalInfo?: string | null;
	title?: string | null;
	description?: string | null;
	status?: string | null;
	createdAt?: string | null;
	updatedAt?: string | null;

	// Constructor
	constructor(data: ListingProps = {}) {
		this._id = data._id ? data._id : null;
		this.userId = data.userId ? data.userId : null;
		this.type = data.type ? data.type : null;
		this.space = data.space ? data.space : null;
		this.ownership = data.ownership ? data.ownership : null;
		this.coordinate = data.coordinate ? data.coordinate : null;
		this.geocode = data.geocode ? data.geocode : null;
		this.generatedAddress = data.generatedAddress ? data.generatedAddress : null;
		this.street = data.street ? data.street : null;
		this.streetNumber = data.streetNumber ? data.streetNumber : null;
		this.village = data.village ? data.village : null;
		this.district = data.district ? data.district : null;
		this.city = data.city ? data.city : null;
		this.province = data.province ? data.province : null;
		this.country = data.country ? data.country : null;
		this.zipCode = data.zipCode ? data.zipCode : null;
		this.building = data.building ? data.building : null;
		this.addressNotes = data.addressNotes ? data.addressNotes : null;
		this.maximumGuests = data.maximumGuests ? data.maximumGuests : null;
		this.areaSize = data.areaSize ? data.areaSize : null;
		this.bedrooms = data.bedrooms ? data.bedrooms : null;
		this.bathrooms = data.bathrooms ? data.bathrooms : null;
		this.kitchen = data.kitchen ? data.kitchen : null;
		this.balcony = data.balcony ? data.balcony : null;
		this.photos = data.photos ? data.photos : null;
		this.facilities = data.facilities ? data.facilities : {};
		this.dailyRent = data.dailyRent ? data.dailyRent : false;
		this.transit3Rent = data.transit3Rent ? data.transit3Rent : false;
		this.transitRent = data.transitRent ? data.transitRent : false;
		this.baseRates = data.baseRates ? data.baseRates : {
			daily: {
				weekday: null,
				weekend: null,
				peak: null,
			},
			transit: {
				weekday: null,
				weekend: null,
				peak: null,
			},
			transit3: {
				weekday: null,
				weekend: null,
				peak: null,
			},
		};
		this.petFriendly = data.petFriendly ? data.petFriendly : false;
		this.smokingAllowed = data.smokingAllowed ? data.smokingAllowed : false;
		this.checkInTime = data.checkInTime ? data.checkInTime : null;
		this.maxCheckInTime = data.maxCheckInTime ? data.maxCheckInTime : null;
		this.checkOutTime = data.checkOutTime ? data.checkOutTime : null;
		this.checkInInstructions = data.checkInInstructions ? data.checkInInstructions : null;
		this.checkOutInstructions = data.checkOutInstructions ? data.checkOutInstructions : null;
		this.additionalInfo = data.additionalInfo ? data.additionalInfo : null;
		this.title = data.title ? data.title : null;
		this.description = data.description ? data.description : null;
		this.status = data.status ? data.status : "";
		this.createdAt = data.createdAt ? data.createdAt : null;
		this.updatedAt = data.updatedAt ? data.updatedAt : null;
	}

	// Getter

	getTitle(): string {
		return this.title ?? `${this.getType() || "Properti"} belum ada judul`;
	}

	getLocationString(): string | null {
		const parts: string[] = [];
		if (this.village) parts.push(this.village);
		if (this.district) parts.push(this.district);
		if (this.city) parts.push(this.city);
		return parts.length ? parts.join(", ") : "";
	}

	getDetails(): string | null {
		if (!this.updatedAt) return null;
		const parts: string[] = [];
		if (this.type) {
			parts.push(this.getType());
		}
		if (this.getLocationString() !== null) parts.push(this.getLocationString()!);
		return parts.length ? parts.join(", ") : "";
	}

	getType(): string {
		if (!this.type) return "";
		switch (this.type) {
			case "apartment":
				return "Apartemen";
			case "villa":
				return "Villa";

			default:
				return this.type;
		}
	}

	getLastUpdated(): string {
		if (!this.updatedAt && !this.createdAt) return "-";
		if (this.createdAt === this.updatedAt) return `Dibuat ${DateTimeUtils.convertStringToDateTime(this.createdAt!)?.toRelative() ?? "-"}`;
		return `Diperbarui ${DateTimeUtils.convertStringToDateTime(this.updatedAt!)?.toRelative() ?? "-"}`;
	}

	getStatus(): string {
		switch (this.status) {
			case "published":
				return "Aktif";
			case "unpublished":
				return "Tidak aktif";
			default:
				return "";
		}
	}

	getPriceBreakdown(options: ListingOptions) {
		const result: {
			mode: string;
			breakdown: { date: string; price: number }[];
			subtotal: number;
			total: number;
			average: number;
		} = {
			mode: options.mode ?? "nightly",
			breakdown: [],
			subtotal: 0,
			total: 0,
			average: 0,
		};

		if (options.checkIn && options.checkOut) {
			const dates = DateTimeUtils.getDatesBetween(options.checkIn, options.checkOut);
			for (let date of dates) {
				let price: number = 0;
				if (DateTimeUtils.isDateWeekend(date)) price = this.baseRates?.daily?.weekend ?? 0;
				else price = this.baseRates?.daily?.weekday ?? 0;
				result.breakdown.push({ date, price })
				result.subtotal = result.subtotal + price;
			}
			const duration = DateTimeUtils.getDaysBetween(options.checkIn, options.checkOut);
			result.total = Math.floor(result.subtotal * 1.1);
			result.average = Math.floor(result.total / duration);
		}

		return result;
	}

	getAverageRate(options: ListingOptions): number {
		const price = this.getPriceBreakdown(options);
		return price.average;
	}

	// Static class functions

	static fromArray(items: ListingProps[]): Listing[] {
		const result: Listing[] = [];

		for (let item of items) {
			result.push(new this(item));
		}

		return result;
	}

} // class Listing