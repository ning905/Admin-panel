import { useContext, useState } from "react"
import "./login.scss"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import client from "../../utils/client"

const tokenKey = process.env.REACT_APP_USER_TOKEN

export default function Login() {
	const [error, setError] = useState("")
	const [inputs, setInputs] = useState({ email: "", password: "" })
	const navigate = useNavigate()
	const { userAction } = useContext(AuthContext)

	function handleInput(e) {
		const { name, value } = e.target
		setInputs({ ...inputs, [name]: value })
	}

	async function handleLogin(e) {
		e.preventDefault()

		client
			.post("/users/login", inputs)
			.then((res) => {
				const token = res.data.data.token
				localStorage.setItem(tokenKey, token)
				userAction({ type: "LOGIN", payload: res.data.data.user })
				navigate("/")
			})
			.catch((err) => setError(err.response.data.message))
	}

	return (
		<div className="login">
			<h1>Welcome to the admin panel</h1>
			<h2>Please login: </h2>
			<Box
				className="box"
				component="form"
				sx={{
					"& > :not(style)": { m: 1, width: "30ch" },
				}}
				autoComplete="off"
				onSubmit={handleLogin}
			>
				<TextField
					required
					variant="outlined"
					label="Email"
					type="email"
					name="email"
					value={inputs.email}
					onChange={handleInput}
				/>
				<TextField
					required
					variant="outlined"
					label="Password"
					type="password"
					name="password"
					value={inputs.password}
					onChange={handleInput}
				/>
				<button type="submit">Login</button>
			</Box>
			{error && <span>{error}</span>}
			<p>
				Not have an account yet? Sign up <Link to="/signup">here</Link>
			</p>
		</div>
	)
}
