"use client";

import styles from "./styles/style.module.scss";
import { AuthGuard } from "@/components/AuthGuard";
import { useAuth } from "@/context/AuthContext";
import { Button, Form, FormValues, PasswordField, TextField } from "@/ui";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {

	const auth = useAuth();
	const router = useRouter();

	const [ errorMessage, setErrorMessage ] = useState<string>("");
	const [ data, setData ] = useState<FormValues>({
		name: "",
		email: "",
		password: "",
	});

	const handleSubmit = async () => {
		const response = await auth.register(data.name, data.email, data.password);
		if (response.error) setErrorMessage(response.message);
		else router.push("/");
	};
	
	return (
		<AuthGuard mode="guest">
			<div className={styles.RegisterPage}>

				<div className={styles.RegisterBox}>
					<h1>Register</h1>

					{errorMessage !== "" && (
						<div className={styles.ErrorMessage}>
							{errorMessage}
						</div>
					)}

					<Form initialValues={data} onUpdate={(values) => { setData(values); setErrorMessage(""); }} onSubmit={() => handleSubmit()}>
						<TextField name="name" label="Full Name" />
						<TextField name="email" label="Email Address" />
						<PasswordField name="password" label="Password" />
						<div className="my-8"></div>
						<Button label="Register" color="primary" width="full" type="submit" />
						<div className="my-1"></div>
						<Button label="Login" color="primary-inverse" width="full" href="/login" />
					</Form>
				</div>
			</div>
		</AuthGuard>
	);
}