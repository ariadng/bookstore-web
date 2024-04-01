import { FormEventHandler, ReactNode, createContext, forwardRef, useContext, useEffect, useImperativeHandle, useMemo, useState } from "react";

export interface FormValues {
	[key: string]: any;
}

export interface FormContextProps {
	values: FormValues;
	getValue: Function;
	updateValue: Function;
	updateValues: Function;
	submit: Function;
}

export const FormContextDefaults: FormContextProps = {
	values: {},
	getValue: () => {},
	updateValue: () => {},
	updateValues: () => {},
	submit: () => {},
}

export const FormContext = createContext<FormContextProps>(FormContextDefaults);

export interface FormProviderProps {
	initialValues?: FormValues;
	contextRef?: (ref: FormContextProps) => void;
	onUpdate?: (values: FormValues) => void;
	onSubmit?: Function;
	children?: ReactNode;
	className?: string;
}

export const Form = forwardRef(function Form(props: FormProviderProps, ref) {
	const [values, setValues] = useState<FormValues>(props.initialValues ?? {});

	// Form events

	const handleFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();
		if (props.onSubmit) {
			props.onSubmit(values);
		}
	};

	// Context-related events & values

	const getValue = (key: string, data: FormValues = values): any => {
		const pathSegments = key.split('.');

		if (pathSegments.length === 1) {
			return data[key];
		}

		const topLevelKey = pathSegments[0];
		const remainingPath = pathSegments.slice(1).join('.');

		return getValue(remainingPath, data[topLevelKey]);
	};

	const updateValue = (key: string, value: any) => {
		const pathSegments = key.split('.');
		const topLevelKey = pathSegments[0];
		const remainingPath = pathSegments.slice(1).join('.');

		// Clone the values object
		const updatedValues = { ...values };

		// Update the nested object recursively
		updatedValues[topLevelKey] = updateNestedValue(remainingPath, value, updatedValues[topLevelKey]);

		// Set the updated values
		setValues(updatedValues);
	};

	const updateNestedValue = (key: string, value: any, nestedObject: any): any => {
		if (!key) {
			return value; // Base case: reached the leaf node
		}

		const pathSegments = key.split('.');
		const topLevelKey = pathSegments[0];
		const remainingPath = pathSegments.slice(1).join('.');

		// Create nested object if it doesn't exist
		if (!nestedObject[topLevelKey]) {
			nestedObject[topLevelKey] = {};
		}

		// Update the nested object recursively
		nestedObject[topLevelKey] = updateNestedValue(remainingPath, value, nestedObject[topLevelKey]);

		return nestedObject;
	};

	const updateValues = (newValues: any) => {
		setValues({ ...values, ...newValues });
	};

	const submit = () => {
		if (props.onSubmit) {
			props.onSubmit(values);
		}
	};

	const contextValue: FormContextProps = useMemo(() => {
		return {
			values, getValue, updateValue, updateValues,
			submit,
		}
	}, [values]);


	useEffect(() => {
		if (props.contextRef) {
			props.contextRef(contextValue);
		}
	}, [props.contextRef, contextValue]);


	useEffect(() => {
		if (props.onUpdate) props.onUpdate(values);
	}, [values]);

	useImperativeHandle(ref, () => {
		return {
			update(newValues: FormValues) {
				setValues({...values, ...newValues});
			}
		};
	}, []);

	return (
		<FormContext.Provider value={contextValue}>
			<form
				className={props.className}
				onSubmit={handleFormSubmit}
			>
				{props.children}
			</form>
		</FormContext.Provider>
	)
});


export function useForm() {
	return useContext(FormContext);
}