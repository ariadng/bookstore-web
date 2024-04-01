import { DateTime } from "luxon";
import { DateTimeUtils } from "./DateTimeUtils";

export class StringUtils {

	static formatMode(input?: string | null): string {
		switch (input) {
			case "nightly":
				return "Per malam"
			case "hourly":
				return "Per jam"
			default:
				return input ?? "";
		}
	}

	static formatDateLong(input?: string | null): string {
		if (!input) return "-";
		const date = DateTimeUtils.convertStringToDateTime(input);
		return date?.toLocaleString(DateTime.DATE_HUGE) ?? "-";
	}

} // class