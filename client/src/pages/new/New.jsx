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
import {
	adminProductInput,
	productInit,
	productInputs,
	userInit,
	userInputs,
} from "../../utils/formSource"

export default function New() {
	const [file, setFile] = useState("")
	const [data, setData] = useState({})
	const [alert, setAlert] = useState({})
	const [page, setPage] = useState({
		title: "",
		inputFields: [],
		initialData: {},
	})

	const { currentUser } = useContext(AuthContext)
	const location = useLocation()

	useEffect(() => {
		if (location.pathname === "/products/new") {
			let inputFields = productInputs

			if (currentUser.role === "ADMIN") {
				inputFields = productInputs.concat(adminProductInput)
			}

			setPage({
				title: "Product",
				inputFields: inputFields,
				initialData: productInit,
			})
		} else if (
			location.pathname === "/users/new" &&
			currentUser.role === "ADMIN"
		) {
			setPage({
				title: "User",
				inputFields: userInputs,
				initialData: userInit,
			})
		}
	}, [currentUser.role, location.pathname])

	function handleUploadFile(e) {
		if (e.target.files[0].size / 1024 / 1024 > 2) {
			setAlert({
				status: "error",
				message: "Image size cannot be larger than 2MB",
			})

			setTimeout(() => {
				setAlert({})
			}, "3000")
		} else {
			setFile(e.target.files[0])
		}
	}

	function handleKeyDown(e) {
		const invalidChars = ["-", "+", "e"]

		if (
			(e.target.name === "price" || e.target.name === "stock") &&
			invalidChars.includes(e.key)
		) {
			e.preventDefault()
		} else if (e.target.name === "stock" && e.key === ".") {
			e.preventDefault()
		} else if (e.target.name === "price" && e.target.value.includes(".")) {
			const arr = e.target.value.split(".")
			if (arr[1].length >= 2) {
				e.preventDefault()
			}
		}
	}

	function handleInputs(e) {
		const { name, value } = e.target

		setData({ ...data, [name]: value })
	}

	async function handleAddNew(e) {
		e.preventDefault()
		const body = { ...data }

		if (file) {
			body.imgUrl = URL.createObjectURL(file)
		}

		client
			.post(location.pathname.slice(0, -4), body)
			.then((res) => {
				setAlert({
					status: "success",
					message: page.title + " created",
				})

				setTimeout(() => {
					setAlert({})
					setData(page.initialData)
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
					<h1>Add New {page.title}</h1>
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
							autoComplete="off"
							onSubmit={handleAddNew}
						>
							{page.inputFields.map((input) => (
								<TextField
									required={input.required}
									multiline={input.name === "description"}
									maxRows={4}
									variant="outlined"
									label={input.label}
									type={input.type}
									name={input.name}
									value={data[input.name]}
									key={input.id}
									className="form-input"
									onChange={handleInputs}
									onKeyDown={handleKeyDown}
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
