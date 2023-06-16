import { useState } from 'react';
import './App.css';

function App() {
	const [task, setTask] = useState("")
	const [listOfTasks, setListOfTasks] = useState([])
	const [username, setUsername] = useState("")
	const [listOfUsernames, setListOfUsernames] = useState([])
	const [listOfTasksFF, setListOfTasksFF] = useState([])

	const handleChange = (event) => {
		setTask(event.target.value)
	}

	const addingTask = (event) => {
		if (event.key === "Enter") {
			setListOfTasks(listOfTasks.concat([task]));
			setTask("");
		}
	}

	const handleUsername = (event) => {
		setUsername(event.target.value)
	}

	fetch("http://assets.breatheco.de/apis/fake/todos/user", {
		method: "GET",
		headers:{"Content-Type":"application/json"}
	}).then((response)=>{
		return response.json()
	}).then((data)=>{
		setListOfUsernames(data)
	}).catch((error)=>{
		console.log(error)
	})


	if(username!==""&&username!=="Choose user"){
		fetch("http://assets.breatheco.de/apis/fake/todos/user/"+username,{
			method:"GET",
			headers:{"Content-Type":"application/json"}
		}).then((response)=>{
			return response.json()
		}).then((data)=>{
			setListOfTasksFF(data)
		}).catch((error)=>{
			console.log(error)
		})
	}
	
	const deleteUsername = () => {
		fetch("http://assets.breatheco.de/apis/fake/todos/user/"+username,{
			method:"DELETE",
			headers:{"Content-Type":"application/json"}
		}).then((response)=>{
			return response.json()
		}).then((data)=>{
			console.log(data)
		}).catch((error)=>{
			console.log(error)
		})
		setUsername("")
	}

	const updateList = () => {
		fetch("http://assets.breatheco.de/apis/fake/todos/user/"+username,{
			method:"PUT",
			body: JSON.stringify(listOfTasksFF),
			headers:{"Content-Type":"application/json"}
		}).then((response)=>{
			return response.json()
		}).then((data)=>{
			console.log(data)
		}).catch((error)=>{
			console.log(error)
		})
		setUsername("")
	}

	return (
		<div>
			<div className='header'>
				<select className='selection' onChange={handleUsername}>
					<option>Choose user</option>
					{listOfUsernames.map((item, index)=>{ return <option key={index}>{item}</option>})}
				</select>
			</div>
			<div id="container">
				<h1 className="todo-header">To do List</h1>
				<input id="addToDo" type="text" placeholder="Add to do here" onChange={handleChange} value={task} onKeyUp={addingTask} />
				<ul>
					{ listOfTasksFF.length===0 ? <li>No tasks remaining</li> :
					listOfTasksFF.map((item, index) => {
						return <li key={index}>{item.label}</li>
					})
				}
				</ul>
				<div>{listOfTasksFF.length!==0 ? (listOfTasksFF.length === 1 ? listOfTasksFF.length + " task left" : listOfTasksFF.length + " tasks left") : null}</div>
			</div>
			<div className='footer'>
				<button className="button" onClick={updateList}>Update list of tasks</button>
				<button className="button2" onClick={deleteUsername}>Delete user and tasks</button>
			</div>
		</div>
	);
}

export default App;
/* 
<ul>
					{ listOfTasks.length===0 ? <li>No tasks remaining</li> :
					listOfTasks.map((item, index) => {
						return <li key={index}><span><i className="fa fa-trash" onClick={() => setListOfTasks(listOfTasks.filter((itemToBeEliminated, currentIndex) => index !== currentIndex))}></i></span>{item}{" "}</li>
					})
					}
				</ul>
				<div>{listOfTasks.length!==0 ? (listOfTasks.length === 1 ? listOfTasks.length + " task left" : listOfTasks.length + " tasks left") : null}</div>
				*/