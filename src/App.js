import { useState } from 'react';
import './App.css';

function App() {
const [task, setTask] = useState("")
const handleChange = (event) => {
    setTask(event.target.value)
  }

const [listOfTasks, setListOfTasks] = useState([])
const addingTask = (event) => {
	if (event.key === "Enter"){
		setListOfTasks(listOfTasks.concat([task]));
		setTask("");
	}
}

  return (
	<div id="container">
		<h1 className="todo-header">To do List</h1>
			<input id="addToDo" type="text" placeholder="Add to do here" onChange={handleChange} value={task} onKeyUp={addingTask}/>
			<ul>
				<li><span><i className="fa fa-trash"></i></span>{task}</li>
				{listOfTasks.map((item, index)=>{<li><span><i className="fa fa-trash" onClick={()=>setListOfTasks(listOfTasks.filter((itemToBeEliminated, currentIndex)=>index!= currentIndex))}></i></span>{item}{" "}</li>})}
			</ul>
		<div>{listOfTasks.length+" tasks left"}</div>
	</div>
  );
}

export default App;
