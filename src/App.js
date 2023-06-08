import './App.css';

function App() {
  return (
    <div id="container">
			<h1 className="todo-header">To do List</h1>
			<input id="addToDo" type="text" placeholder="Add to do here" />
			<ul>
				<li>
					<span><i className="fa fa-trash"></i></span> Eat
				</li>
				<li>
					<span><i className="fa fa-trash"></i></span> Drink
				</li>
				<li>
					<span><i className="fa fa-trash"></i></span> Sleep
				</li>
			</ul>
		</div>
  );
}

export default App;
