import "./new.scss"
import { DriveFolderUploadOutlined } from "@mui/icons-material"
import { doc, serverTimestamp, setDoc } from "firebase/firestore"
import { useEffect, useState } from "react"
import Navbar from "../../components/navbar/Navbar.jsx"
import Sidebar from "../../components/sidebar/Sidebar.jsx"
import { auth, db, storage } from "../../firebase.js"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { useNavigate } from "react-router-dom"

export default function New({ inputs, title }) {
	const [file, setFile] = useState("")
	const [data, setData] = useState({})
	const [perc, setPerc] = useState(null)
	const navigate = useNavigate()

	useEffect(() => {
		function uploadFile() {
			const name = new Date().getTime() + file.name
			const storageRef = ref(storage, name)
			const uploadTask = uploadBytesResumable(storageRef, file)

			uploadTask.on(
				"state_changed",
				(snapshot) => {
					const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
					setPerc(progress)
					console.log("Upload is " + progress + "% done")
					switch (snapshot.state) {
						case "paused":
							console.log("Upload is paused")
							break
						case "running":
							console.log("Upload is running")
							break
						default:
							break
					}
				},
				(error) => {
					console.error(error)
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
						setData((data) => ({ ...data, img: downloadURL }))
					})
				}
			)
		}
		file && uploadFile()
	}, [file])

	function handleInputs(e) {
		const { name, value } = e.target
		setData({ ...data, [name]: value })
	}

	async function handleAddNew(e) {
		e.preventDefault()

		try {
			const { user } = await createUserWithEmailAndPassword(
				auth,
				data.email,
				data.password
			)
			await setDoc(doc(db, "users", user.uid), {
				...data,
				timeStamp: serverTimestamp(),
			})
			navigate(-1)
		} catch (err) {
			console.error(err)
		}
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
