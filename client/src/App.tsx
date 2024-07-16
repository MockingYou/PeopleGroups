import DraggableList from "./app/components/DragableList";
import Header from "./app/components/Header";
function App() {
	return (
		<>
			<Header />
			<div className="container mx-auto p-4">
				<DraggableList />
			</div>
		</>
	);
}

export default App;
