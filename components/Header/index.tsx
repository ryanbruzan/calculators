'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Header.module.scss';

type Props = {};

const Header = ({}: Props) => {
	const pathname = usePathname();

	return (
		<div className={styles.header}>
			<Link
				href="/drip"
				className={clsx(styles.link, {
					[styles.active]: pathname === '/drip',
				})}
			>
				Home
			</Link>
		</div>
	);
};

export default Header;
