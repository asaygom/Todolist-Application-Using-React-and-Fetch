import { useEffect, useState } from 'react';
import './App.css';

function App() {
	const [task, setTask] = useState({label:""})
	const [listOfTasks, setListOfTasks] = useState([])
	const [username, setUsername] = useState("")
	const [listOfUsernames, setListOfUsernames] = useState([])

	const handleChange = (event) => {
		setTask(task =>({
			...task, label: event.target.value, done: false
		}))
	}

	const addingTask = (event) => {
		if (event.key === "Enter") {
			setListOfTasks(listOfTasks.concat([task]));
			setTask({label:""});
		}
	}

	const handleUsername = (event) => {
		setUsername(event.target.value)
		event.preventDefault()
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

	useEffect(()=>{if(username!==""&&username!=="Choose user"){
		fetch("http://assets.breatheco.de/apis/fake/todos/user/"+username,{
			method:"GET",
			headers:{"Content-Type":"application/json"}
		}).then((response)=>{
			return response.json()
		}).then((data)=>{
			setListOfTasks(data)
		}).catch((error)=>{
			console.log(error)
		})
	}else setListOfTasks([])},[username])
	
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
			body: JSON.stringify(listOfTasks),
			headers:{"Content-Type":"application/json"}
		}).then((response)=>{
			return response.json()
		}).then((data)=>{
			console.log(data)
		}).catch((error)=>{
			console.log(error)
		})
		
	}

	const createUser = (event) => {
		if (event.key === "Enter") {
			fetch("http://assets.breatheco.de/apis/fake/todos/user/"+username,{
				method:"POST",
				body: JSON.stringify("[]"),
				headers:{"Content-Type":"application/json"}
			}).then((response)=>{
				return response.json()
			}).then((data)=>{
				console.log(data)
			}).catch((error)=>{
				console.log(error)
			})
			
		}
	}

	return (
		<div>
			<div className='header'>
				<select className='form-select' onChange={handleUsername} value={username}>
					<option>Choose user</option>
					{listOfUsernames.map((item, index)=>{ return <option key={index}>{item}</option>})}
				</select>
				<span className="form-label">OR</span>
				<div className="input-group">
					<input id="createUser" type="text" className="form-control" placeholder="Recipient's username" onChange={handleUsername} value={username} aria-label="Recipient's username" aria-describedby="button-addon2" />
					<button className="btn" type="button" id="button-addon2" onClick={createUser}>Create user</button>
				</div>
			</div>
			<div id="container">
				<h1 className="todo-header">To do List</h1>
				<input id="addToDo" type="text" placeholder="Add to do here" onChange={handleChange} value={task.label} onKeyUp={addingTask} />
				<ul>
					{ listOfTasks.length===0 ? <li>No tasks remaining</li> :
					listOfTasks.map((item, index) => {
						return <li key={index}><span className="trash" onClick={() => setListOfTasks(listOfTasks.filter((itemToBeEliminated, currentIndex) => index !== currentIndex))}><i className="fa fa-trash"></i></span>{item.label}</li>
					})
				}
				</ul>
				<div>{listOfTasks.length!==0 && (listOfTasks.length === 1 ? listOfTasks.length + " task left" : listOfTasks.length + " tasks left")}</div>
			</div>
			<div className='footer'>
				<button id="button" className="btn" onClick={updateList}>Update list of tasks</button>
				<button id="button2" className="btn" onClick={deleteUsername}>Delete user and tasks</button>
			</div>
		</div>
	);
}

export default App;