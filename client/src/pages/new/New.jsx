import "./new.scss"
import { DriveFolderUploadOutlined } from "@mui/icons-material"
import { useContext, useEffect, useState } from "react"
import Navbar from "../../components/navbar/Navbar.jsx"
import Sidebar from "../../components/sidebar/Sidebar.jsx"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import client from "../../utils/client"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import {
	adminProductInput,
	getProductData,
	getUserData,
	productInit,
	productInputs,
	userInit,
	userInputs,
} from "../../utils/formSource"

export default function New() {
	const { currentUser } = useContext(AuthContext)
	const location = useLocation()
	const params = useParams()
	const initPage = {
		title: "",
		action: "Add",
		initialData: {},
		inputFields: [],
		initImgUrl:
			"https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg",
	}
	let endpoint
	let getImgUrl
	console.log("productInit", productInit)
	if (location.pathname.includes("/products")) {
		initPage.title = "Product"
		initPage.initialData = productInit
		initPage.inputFields = productInputs

		if (currentUser.role === "ADMIN") {
			initPage.inputFields = productInputs.concat(adminProductInput)
		}

		if (location.pathname.includes("/edit")) {
			initPage.action = "Update"
			endpoint = "/products/" + params.id
			getImgUrl = (data) => data.imgUrl
		}
	} else if (
		location.pathname.includes("/users") &&
		currentUser.role === "ADMIN"
	) {
		initPage.title = "User"
		initPage.inputFields = userInputs
		initPage.initialData = userInit

		if (location.pathname.includes("/edit")) {
			endpoint = "/users/" + params.username
			getImgUrl = (data) => data.profile.imgUrl
			initPage.action = "Update"
			initPage.inputFields = userInputs.map((input) => {
				if (input.name === "password") {
					input.required = false
				}
				return input
			})
		}
	}

	const [alert, setAlert] = useState({})
	const [imgUrl, setImageUrl] = useState(initPage.initImgUrl)
	const [data, setData] = useState(initPage.initialData)
	const [page, setPage] = useState(initPage)
	const navigate = useNavigate()
	console.log("page: ", page)
	useEffect(() => {
		if (page.action === "Update") {
			client
				.get(endpoint)
				.then((res) => {
					setPage((pre) => ({
						...pre,
						initImgUrl: getImgUrl(res.data.data),
					}))
					console.log("data loaded: ", res.data.data)
					if (page.title === "Product") {
						setData(getProductData(res.data.data))
					} else if (page.title === "User") {
						setData(getUserData(res.data.data))
					}
					setImageUrl(getImgUrl(res.data.data))
				})
				.catch((err) => {
					console.log("error", err)
					setAlert({
						status: "error",
						message: err.response.data.message,
					})

					setTimeout(() => {
						setAlert({})
					}, "3000")
				})
		}
	}, [currentUser, location, params, page.action])

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
			setImageUrl(URL.createObjectURL(e.target.files[0]))
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

	async function handleSubmit(e) {
		e.preventDefault()
		const body = { ...data }

		if (page.action === "Add") {
			if (imgUrl !== initPage.initImgUrl) {
				body.imgUrl = imgUrl
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
						setData(initPage.initialData)
						setImageUrl(initPage.initImgUrl)
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
		} else if (page.action === "Update") {
			body.imgUrl = imgUrl

			client
				.patch(endpoint, body)
				.then((res) => {
					setAlert({
						status: "success",
						message: page.title + " updated",
					})

					setTimeout(() => {
						if (page.title === "Product") {
							navigate(`/products/${params.id}`)
						} else if (page.title === "User") {
							if (currentUser.role === "ADMIN") {
								navigate(`/users/${res.data.data.username}`)
							} else {
								navigate("/users/profile")
							}
						}
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
	}

	// console.log("imgUrl: ", imgUrl)
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
						<img src={imgUrl} alt="uploaded" />

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
							onSubmit={handleSubmit}
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

							<div className="button-wrap">
								<button
									type="submit"
									className="submit"
									disabled={alert.message ? true : false}
								>
									{page.action}
								</button>
								<button className="cancel" onClick={() => navigate(endpoint)}>
									Cancel
								</button>
							</div>
						</Box>
					</div>
				</div>
			</div>
		</div>
	)
}
