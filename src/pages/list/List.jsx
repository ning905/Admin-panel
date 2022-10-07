import DataTable from "../../components/dataTable/DataTable"
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import "./list.scss"

export default function List() {
	return (
		<div className="list">
			<Sidebar />
			<div className="list-container">
				<Navbar />
				<DataTable />
			</div>
		</div>
	)
}
