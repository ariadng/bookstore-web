export default class Constants {

	public static PROPERTY_TYPE_OPTIONS: {
		value: string | null;
		label: string;
	}[] = [
		{ value: null, label: "Semua properti" },
		{ value: "villa", label: "Vila" },
		{ value: "apartment", label: "Apartemen" }
	];

	public static getPropertyTypeLabel(value?: string | null): string {
		const findValue = value ?? null;
		const type = this.PROPERTY_TYPE_OPTIONS.find(row => row.value === findValue);
		return type!.label;
	}

}