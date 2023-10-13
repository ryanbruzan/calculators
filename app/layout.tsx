import Header from '@/components/Header';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { ReactNode } from 'react';
import './globals.css';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500'] });

export const metadata: Metadata = {
	title: 'Calculators',
	description: 'A set of calculators by Ryan Bruzan',
	robots: 'noindex',
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<body className={poppins.className}>
				<main>
					<Header />
					{children}
				</main>
			</body>
		</html>
	);
}
