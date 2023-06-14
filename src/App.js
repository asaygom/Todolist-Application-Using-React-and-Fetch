import { useState } from 'react';
import './App.css';

function App() {
	const [task, setTask] = useState("")
	const [listOfTasks, setListOfTasks] = useState([])

	const handleChange = (event) => {
		setTask(event.target.value)
	}

	const addingTask = (event) => {
		if (event.key === "Enter") {
			setListOfTasks(listOfTasks.concat([task]));
			setTask("");
		}
	}

	return (
		<div id="container">
			<h1 className="todo-header">To do List</h1>
			<input id="addToDo" type="text" placeholder="Add to do here" onChange={handleChange} value={task} onKeyUp={addingTask} />
			<ul>
				{ listOfTasks.length===0 ? <li>No tasks remaining</li> :
				listOfTasks.map((item, index) => {
					 return <li key={index}><span><i className="fa fa-trash" onClick={() => setListOfTasks(listOfTasks.filter((itemToBeEliminated, currentIndex) => index !== currentIndex))}></i></span>{item}{" "}</li>
				})
				}
			</ul>
			<div>{listOfTasks.length!==0 ? (listOfTasks.length === 1 ? listOfTasks.length + " task left" : listOfTasks.length + " tasks left") : null}</div>
		</div>
	);
}

export default App;
