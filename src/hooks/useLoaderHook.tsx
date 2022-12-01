import {Dispatch, SetStateAction, useState} from 'react';
import {useToast} from '@chakra-ui/react';

export type LoaderWrapper = (...args: any[]) => Promise<any> | any;

export interface UseLoaderHook {
	isLoading: boolean;
	setIsLoading: Dispatch<SetStateAction<boolean>>;
	wrapperBhai: LoaderWrapper;
}

export const useLoaderHook = (): UseLoaderHook => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const toast = useToast();

	const wrapperBhai = (functionCall: LoaderWrapper, showToast = false, successMessage = 'Success') => {
		let result: any = undefined;
		const nestedFunc = async (...args: any) => {
			setIsLoading(true);
			try {
				result = await functionCall(...args);
				// reassign as true if the result is undefined as otherwise itll be treated as error
				result ??= true;
				if (showToast) {
					toast({
						title: successMessage,
						isClosable: true,
						status: 'success'
					});
				}
			} catch (e: any) {
				toast({
					title: e?.message || e || 'An error occurred',
					isClosable: true,
					status: 'error'
				});
			} finally {
				setIsLoading(false);
			}
			return result
		};
		return nestedFunc;
	}
    return {
		isLoading, setIsLoading, wrapperBhai
	}
}

export default useLoaderHook;
