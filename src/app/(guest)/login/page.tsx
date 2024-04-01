import { GoogleLoginButton } from "@/ui/GoogleLoginButton/component";
import styles from "./styles/style.module.scss";
import { AuthGuard } from "@/components/AuthGuard";

export default function LoginPage() {
	
	return (
		<AuthGuard mode="guest">
			<div className={styles.LoginPage}>

				<div className={styles.LoginBox}>
					<h1>Login</h1>
					<p>
						Nikmati fitur lengkap <strong>Restay</strong> yang personal untuk Anda.
						Tidak perlu membuat akun, cukup hanya menggunakan akun Google.
					</p>
					<GoogleLoginButton />
				</div>
			</div>
		</AuthGuard>
	);
}