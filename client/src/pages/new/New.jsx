import "./new.scss"
import { DriveFolderUploadOutlined } from "@mui/icons-material"
import { useContext, useEffect, useState } from "react"
import Navbar from "../../components/navbar/Navbar.jsx"
import Sidebar from "../../components/sidebar/Sidebar.jsx"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import client from "../../utils/client"
import { useLocation } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { productInputs, userInit, userInputs } from "../../utils/formSource"

export default function New() {
	const [file, setFile] = useState("")
	const [title, setTitle] = useState("")
	const [inputFields, setInputFields] = useState([])
	const [data, setData] = useState({})
	const [alert, setAlert] = useState({})

	const { currentUser } = useContext(AuthContext)
	const location = useLocation()

	useEffect(() => {
		if (location.pathname === "/products/new") {
			setInputFields(productInputs)
			setTitle("Product")
		} else if (
			location.pathname === "/users/new" &&
			currentUser.role === "ADMIN"
		) {
			setInputFields(userInputs)
			setTitle("User")
		}
	}, [currentUser.role, location.pathname])

	function handleUploadFile(e) {
		console.log("files array: ", e.target.files)
		setFile(e.target.files[0])
	}

	function handleInputs(e) {
		const { name, value } = e.target
		setData({ ...data, [name]: value })
	}
	console.log("data: ", data)

	async function handleAddNew(e) {
		e.preventDefault()

		client
			.post(location.pathname.slice(0, -4), {
				...data,
				imgUrl: URL.createObjectURL(file),
			})
			.then((res) => {
				console.log("response: ", res)
				setAlert({
					status: "success",
					message: title + " created",
				})

				setTimeout(() => {
					setAlert({})
					setData(userInit)
					setFile("")
				}, "3000")
			})
			.catch((err) => {
				setAlert({
					status: "error",
					message: err.response.data.message,
				})

				setTimeout(() => {
					setAlert({})
				}, "3000")
			})
	}

	return (
		<div className="new">
			<Sidebar />
			<div className="new-container">
				<Navbar />

				<div className="top">
					<h1>Add New {title}</h1>
				</div>

				<div className="bottom">
					<div className="left">
						<img
							src={
								file
									? URL.createObjectURL(file)
									: "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
							}
							alt=""
						/>

						<div className="form-input">
							<label htmlFor="file">
								Image: <DriveFolderUploadOutlined className="icon" />
							</label>
							<input
								type="file"
								id="file"
								accept="image/*"
								style={{ display: "none" }}
								onChange={handleUploadFile}
							/>
						</div>

						{alert.status === "success" && (
							<span className="success">{alert.message}</span>
						)}
						{alert.status === "error" && (
							<span className="error">{alert.message}</span>
						)}
					</div>

					<div className="right">
						<Box
							className="box"
							component="form"
							sx={{
								"& > :not(style)": { m: 1, width: "30ch" },
							}}
							validate
							autoComplete="off"
							onSubmit={handleAddNew}
						>
							{inputFields.map((input) => (
								<TextField
									required={input.required}
									variant="outlined"
									label={input.label}
									type={input.type}
									name={input.name}
									value={data[input.name]}
									key={input.id}
									className="form-input"
									onChange={handleInputs}
								/>
							))}

							<button type="submit">Add</button>
						</Box>
					</div>
				</div>
			</div>
		</div>
	)
}
