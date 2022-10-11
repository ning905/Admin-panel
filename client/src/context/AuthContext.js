import { createContext, useEffect, useReducer, useState } from "react"
import AuthReducer from "./AuthReducer"
import jwt_decode from "jwt-decode"

const tokenKey = process.env.REACT_APP_USER_TOKEN
const INITIAL_TOKEN = {
	token: localStorage.getItem(tokenKey) || null,
}

export const AuthContext = createContext(INITIAL_TOKEN)

export const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AuthReducer, INITIAL_TOKEN)
	const [user, setUser] = useState(null)

	useEffect(() => {
		if (state.token) {
			const username = jwt_decode(state.token).username
			setUser({ username })
		}
	}, [state.token])

	return (
		<AuthContext.Provider value={{ currentUser: user, dispatch }}>
			{children}
		</AuthContext.Provider>
	)
}
