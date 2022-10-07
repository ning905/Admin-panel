import { useContext } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { DarkModeContext } from "./context/darkModeContext.js"
import { productInputs, userInputs } from "./formSource.js"
import Home from "./pages/home/Home.jsx"
import List from "./pages/list/List.jsx"
import Login from "./pages/login/Login.jsx"
import New from "./pages/new/New.jsx"
import Single from "./pages/singleItem/Single.jsx"
import "./styles/dark.scss"

function App() {
	const { darkMode } = useContext(DarkModeContext)
	let appClass = "app"
	if (darkMode) {
		appClass += " dark"
	}

	return (
		<div className={appClass}>
			<BrowserRouter>
				<Routes>
					<Route path="/">
						<Route index element={<Home />} />
						<Route path="login" element={<Login />} />
						<Route path="users">
							<Route index element={<List />} />
							<Route path=":userId" element={<Single />} />
							<Route
								path="new"
								element={<New inputs={userInputs} title="Add New User" />}
							/>
						</Route>
						<Route path="products">
							<Route index element={<List />} />
							<Route path=":productId" element={<Single />} />
							<Route
								path="new"
								element={<New inputs={productInputs} title="Add New Product" />}
							/>
						</Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</div>
	)
}

export default App
