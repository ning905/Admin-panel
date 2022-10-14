import { useContext, useState } from "react"
import "./signUp.scss"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import client from "../../utils/client"

const tokenKey = process.env.REACT_APP_USER_TOKEN

export default function SignUp() {
	const [error, setError] = useState("")
	const [inputs, setInputs] = useState({})
	const navigate = useNavigate()
	const { userAction } = useContext(AuthContext)

	function handleInput(e) {
		const { name, value } = e.target
		setInputs({ ...inputs, [name]: value })
	}

	async function handleSignUp(e) {
		e.preventDefault()

		client
			.post("/users/signup", inputs)
			.then((res) => {
				const token = res.data.data.token
				localStorage.setItem(tokenKey, token)
				userAction({ type: "LOGIN", payload: res.data.data.user })
				navigate("/")
			})
			.catch((err) => setError(err.response.data.message))
	}

	return (
		<div className="signUp">
			<h1>Welcome to the admin panel</h1>
			<h2>Sign up to get started!</h2>
			<Box
				className="box"
				component="form"
				sx={{
					"& > :not(style)": { m: 1, width: "30ch" },
				}}
				noValidate
				autoComplete="off"
				onSubmit={handleSignUp}
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
					label="Username"
					type="text"
					name="username"
					value={inputs.username}
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
				<TextField
					variant="outlined"
					label="Full Name"
					type="text"
					name="fullName"
					value={inputs.fullName}
					onChange={handleInput}
				/>
				<TextField
					variant="outlined"
					label="Phone Number"
					type="text"
					name="phone"
					value={inputs.phone}
					onChange={handleInput}
				/>
				<button type="submit">Register</button>
			</Box>

			{error && <span>{error}</span>}

			<p>
				Already have an account? Login <Link to="/login">here</Link>
			</p>
		</div>
	)
}
