import {createContext, useState} from 'react';
import {onAuthStateChanged}from 'firebase/auth';
import {auth} from '../firebase.config';

export const UserContext = createContext<{user: undefined | any, setUser: undefined | any }>({user: undefined, setUser: undefined});

export default function UserContextProvider(props: any) {
	const [user, setUser] = useState<any>(undefined);
	onAuthStateChanged(auth,(user) => {
		if (user) {
			setUser(user)
		} else {
			setUser(undefined)
		}
	})

	return (<UserContext.Provider value={{user, setUser}}>
		{props.children}
	</UserContext.Provider>)
}
