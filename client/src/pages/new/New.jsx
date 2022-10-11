import "./new.scss"
import { DriveFolderUploadOutlined } from "@mui/icons-material"
import { useEffect, useState } from "react"
import Navbar from "../../components/navbar/Navbar.jsx"
import Sidebar from "../../components/sidebar/Sidebar.jsx"
import { useNavigate } from "react-router-dom"

export default function New({ inputs, title }) {
	const [file, setFile] = useState("")
	const [data, setData] = useState({})
	const [perc, setPerc] = useState(null)
	const navigate = useNavigate()

	useEffect(() => {}, [file])

	function handleInputs(e) {
		const { name, value } = e.target
		setData({ ...data, [name]: value })
	}

	async function handleAddNew(e) {
		e.preventDefault()
	}

	return (
		<div className="new">
			<Sidebar />
			<div className="new-container">
				<Navbar />

				<div className="top">
					<h1>{title}</h1>
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
					</div>
					<div className="right">
						<form onSubmit={handleAddNew}>
							<div className="form-input">
								<label htmlFor="file">
									Image: <DriveFolderUploadOutlined className="icon" />
								</label>
								<input
									type="file"
									id="file"
									style={{ display: "none" }}
									onChange={(e) => setFile(e.target.files[0])}
								/>
							</div>

							{inputs.map((input) => (
								<div className="form-input" key={input.id}>
									<label>{input.label}</label>
									<input
										name={input.label.toLowerCase()}
										type={input.type}
										placeholder={input.placeholder}
										onChange={handleInputs}
									/>
								</div>
							))}

							<button disabled={perc !== null && perc < 100} type="submit">
								Send
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}
