import { AuthProvider } from "@/context/AuthContext";
import "@/styles/global.scss";

export const metadata = {
	title: {
		default: "Bookflix | The best bookstore in the universe",
		template: "%s | Bookflix",
	},
	description: "The best bookstore in the universe",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="id">
			<body>
				<AuthProvider>
					{children}
				</AuthProvider>
			</body>
		</html>
	)
}
