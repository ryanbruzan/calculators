import { useEffect, useState } from 'react';

const useStoredState = (initialValue: any, key: string) => {
	const retrieved = localStorage.getItem(key);
	const initial = retrieved === null ? initialValue : retrieved;
	const [state, setState] = useState(initial);

	useEffect(() => {
		localStorage.setItem(key, state);
	}, [state]);

	return [state, setState];
};

export default useStoredState;
