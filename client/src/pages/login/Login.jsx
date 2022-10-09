import { useContext, useState } from "react"
import "./login.scss"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../firebase.js"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"

export default function Login() {
	const [error, setError] = useState(false)
	const [inputs, setInputs] = useState({ email: "", password: "" })
	const navigate = useNavigate()
	const { dispatch } = useContext(AuthContext)

	function handleInput(e) {
		const { name, value } = e.target
		setInputs({ ...inputs, [name]: value })
	}

	function handleLogin(e) {
		e.preventDefault()

		signInWithEmailAndPassword(auth, inputs.email, inputs.password)
			.then((userCredential) => {
				const user = userCredential.user
				dispatch({ type: "LOGIN", payload: user })
				navigate("/")
			})
			.catch(() => {
				setError(true)
			})
	}

	return (
		<div className="login">
			<form onSubmit={handleLogin}>
				<input
					type="email"
					placeholder="Email"
					name="email"
					value={inputs.email}
					onChange={handleInput}
				/>
				<input
					type="password"
					placeholder="password"
					name="password"
					value={inputs.password}
					onChange={handleInput}
				/>
				<button type="submit">Login</button>
				{error && <span>Wrong email or password!</span>}
			</form>
		</div>
	)
}
