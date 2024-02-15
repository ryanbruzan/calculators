'use client';

/**
 * Hack to work around next.js hydration
 * @see https://github.com/uidotdev/usehooks/issues/218
 */

import { useIsClient } from '@uidotdev/usehooks';
import React from 'react';

type ClientOnlyProps = {
	children: React.ReactNode;
};

const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
	const isClient = useIsClient();
	return isClient ? <>{children}</> : null;
};

export default ClientOnly;
