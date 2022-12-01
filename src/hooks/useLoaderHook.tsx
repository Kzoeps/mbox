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
		const nestedFunc = async (...args: any) => {
			setIsLoading(true);
			try {
				const result = await functionCall(...args);
				if (showToast) {
					toast({
						title: successMessage,
						isClosable: true,
						status: 'success'
					});
				}
				return result
			} catch (e: any) {
				toast({
					title: e?.message || e || 'An error occurred',
					isClosable: true,
					status: 'error'
				});
				return false
			} finally {
				setIsLoading(false);
			}
		};
		return nestedFunc;
	}
    return {
		isLoading, setIsLoading, wrapperBhai
	}
}

export default useLoaderHook;
