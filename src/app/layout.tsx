import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import HeaderFrame from "@/components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${inter.className} w-full h-[100vh] bg-slate-950 overflow-y-auto`}
			>
				<HeaderFrame />
				{children}
			</body>
		</html>
	);
}
