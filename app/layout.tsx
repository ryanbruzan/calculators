import '@/app/globals.scss';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { ReactNode } from 'react';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500'] });

export const metadata: Metadata = {
	title: 'Calculators',
	description: 'A set of calculators by Ryan Bruzan',
	robots: 'noindex',
	viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en">
			<body className={poppins.className}>
				<main>{children}</main>
			</body>
		</html>
	);
}
