import { createContext, useEffect, useReducer, useState } from "react"
import AuthReducer from "./AuthReducer"
import jwt_decode from "jwt-decode"
import client from "../utils/client"

const tokenKey = process.env.REACT_APP_USER_TOKEN
const token = localStorage.getItem(tokenKey) || null

const INITIAL_USER = null
export const AuthContext = createContext(INITIAL_USER)

export const AuthContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AuthReducer, { user: INITIAL_USER })

	useEffect(() => {
		if (token) {
			const username = jwt_decode(token).username
			client
				.get(`/users/${username}`)
				.then((res) => dispatch({ type: "LOGIN", payload: res.data.data }))
				.catch((err) => console.error(err))
		}
	}, [])

	return (
		(!token || state.user) && (
			<AuthContext.Provider
				value={{ currentUser: state.user, userAction: dispatch }}
			>
				{children}
			</AuthContext.Provider>
		)
	)
}
