import {Dispatch, SetStateAction, useState} from 'react';

export type LoaderWrapper = (...args: any[]) => Promise<any> | any;

export interface UseLoaderHook {
	isLoading: boolean;
	setIsLoading: Dispatch<SetStateAction<boolean>>;
	wrapperBhai: LoaderWrapper;
}

export const useLoaderHook = (): UseLoaderHook => {
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const wrapperBhai = (functionCall: LoaderWrapper) => {
		const nestedFunc = async (...args: any) => {
			setIsLoading(true);
			await functionCall(...args);
			setIsLoading(false);
		}
		return nestedFunc;
	}
    return {
		isLoading, setIsLoading, wrapperBhai
	}
}

export default useLoaderHook;
