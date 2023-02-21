import {createContext, Dispatch, MutableRefObject, SetStateAction, useRef, useState} from 'react';
import {onAuthStateChanged} from 'firebase/auth';
import {auth} from '../firebase.config';

export const UserContext = createContext<{user: undefined | any, setUser: undefined | any, isCreating: MutableRefObject<boolean> }>({user: undefined, setUser: undefined, isCreating: {current: false}});

export default function UserContextProvider(props: any) {
	const [user, setUser] = useState<any>(undefined);
  const isCreating = useRef<boolean>(false)
	onAuthStateChanged(auth,(user) => {
		if (user) {
			setUser(user)
		} else {
			setUser(undefined)
		}
	})

	return (<UserContext.Provider value={{user, setUser, isCreating}}>
		{props.children}
	</UserContext.Provider>)
}
