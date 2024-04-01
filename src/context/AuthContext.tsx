"use client";

import { User } from "@/types/User";
import AuthUtils from "@/utils/AuthUtils";
import { usePathname } from "next/navigation";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

export interface AuthContextProps {
	user: User | null;
	isAuthenticated: Function;
	isAdmin: Function;
}

export const AuthContextDefaults: AuthContextProps = {
	user: null,
	isAuthenticated: () => { },
	isAdmin: () => { },
}

export const AuthContext = createContext<AuthContextProps>(AuthContextDefaults);

export interface AuthProviderProps {
	children?: ReactNode;
}

export function AuthProvider(props: AuthProviderProps) {

	const pathname = usePathname();

	const [ user, setUser ] = useState<User | null>(null);

	const refreshUser = async () => {
		const token = AuthUtils.getToken();
		if (token) {
			setUser(await AuthUtils.getUser(token));
		} else {
			setUser(null);
		}
	};

	const contextValue: AuthContextProps = {
		user: user,
		isAuthenticated: AuthUtils.isAuthenticated,
		isAdmin: AuthUtils.isAdmin,
	};

	useEffect(() => {
		refreshUser();
	}, [pathname]);

	return (
		<AuthContext.Provider value={contextValue}>
			{props.children}
		</AuthContext.Provider>
	)
};


export function useAuth() {
	return useContext(AuthContext);
}