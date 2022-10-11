import { useContext } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { AuthContext } from "./context/AuthContext.js"
import { DarkModeContext } from "./context/darkModeContext.js"
import { productInputs, userInputs } from "./utils/formSource.js"
import Home from "./pages/home/Home.jsx"
import List from "./pages/list/List.jsx"
import Login from "./pages/login/Login.jsx"
import New from "./pages/new/New.jsx"
import Single from "./pages/singleItem/Single.jsx"
import SignUp from "./pages/signUp/SignUp.jsx"
import "./styles/dark.scss"

function App() {
	const { darkMode } = useContext(DarkModeContext)
	const { currentUser } = useContext(AuthContext)

	let appClass = "app"
	if (darkMode) {
		appClass += " dark"
	}

	function RequireAuth({ children }) {
		return currentUser ? children : <Navigate to="/login" />
	}
	console.log("currentUser", currentUser)
	return (
		<div className={appClass}>
			<BrowserRouter>
				<Routes>
					<Route path="/">
						<Route path="login" element={<Login />} />
						<Route path="signup" element={<SignUp />} />

						<Route
							index
							element={
								<RequireAuth>
									<Home />
								</RequireAuth>
							}
						/>
						<Route path="users">
							<Route
								index
								element={
									// <RequireAuth>
									<List title="Add New User" />
									// </RequireAuth>
								}
							/>
							<Route
								path=":userId"
								element={
									// <RequireAuth>
									<Single />
									// </RequireAuth>
								}
							/>
							<Route
								path="new"
								element={
									// <RequireAuth>
									<New inputs={userInputs} title="Add New User" />
									// </RequireAuth>
								}
							/>
						</Route>
						<Route path="products">
							<Route
								index
								element={
									// <RequireAuth>
									<List title="Add New Product" />
									// </RequireAuth>
								}
							/>
							<Route
								path=":productId"
								element={
									// <RequireAuth>
									<Single />
									// </RequireAuth>
								}
							/>
							<Route
								path="new"
								element={
									// <RequireAuth>
									<New inputs={productInputs} title="Add New Product" />
									// </RequireAuth>
								}
							/>
						</Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
