'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import styles from './Header.module.css';

type Props = {};
type HeaderLinkProps = {
	href: string;
	children: ReactNode;
};

const Header = ({}: Props) => {
	const pathname = usePathname();

	const HeaderLink = ({ href = '/', children }: HeaderLinkProps) => {
		return (
			<Link
				href={href}
				className={linkClass(href)}
			>
				{children}
			</Link>
		);
	};

	const linkClass = (href = '/') => {
		const classes = [styles.link];
		if (pathname === href ? 'active' : '') {
			classes.push(styles.active);
		}
		return classes.join(' ');
	};

	return (
		<div className={styles.header}>
			<HeaderLink href="/drip">DRIP</HeaderLink>
		</div>
	);
};

export default Header;
