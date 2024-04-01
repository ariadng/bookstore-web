import classNames from "classnames";
import { DropdownFieldProps } from "./interface";
import styles from "./styles/style.module.scss";
import { useForm } from "../..";
import { ChangeEventHandler, useMemo } from "react";

export function DropdownField(props: DropdownFieldProps) {

	const form = useForm();

	const value = useMemo(() => {
		const rawValue = form.getValue(props.name);
		if (rawValue) return String(rawValue);
		return "";
	}, [form.values]);

	const handleInputChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
		event.preventDefault();
		form.updateValue(props.name, event.target.value);
	}
	
	return (
		<div className={classNames(
			styles.DropdownField,
		)}>
			{props.label && (
				<label htmlFor="#">{props.label}</label>
			)}
			{props.description && (
				<p className={styles.Description}>{props.description}</p>
			)}
			<select value={value} onChange={handleInputChange}>
				{props.options.map(option => (
					<option
						key={option.value}
						value={option.value}
					>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);

}