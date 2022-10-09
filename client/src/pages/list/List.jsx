import DataTable from "../../components/dataTable/DataTable.jsx"
import Navbar from "../../components/navbar/Navbar.jsx"
import Sidebar from "../../components/sidebar/Sidebar.jsx"
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
