// import React from 'react';
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import About from './components/About'
import Tasks from './components/Tasks'
import AddTask from "./components/AddTask"

/* 
  COMMANDS USED:  
  - npx create-react-app my-app -> Creates a new React Application
  - npm start -> Starts the React Application Development Build
  - npm run build -> Creates a production build of the project
  - npm i react-icons -> Installs React Icons on the Project
  - npm i json-server -> Installs JSON Server on the Project
  - npm i -g serve -> Installs the Serve package, to serve the production build locally
  - npm run server -> Custom Script:
    - json-server --watch db.json --port 5000 -> Runs the JSON Server on port 5000 & watches the db file for any change
*/

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)

  // Mock Tasks for UI
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()
  }, [])

  // Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    // console.log(data)
    return data
  }

  // Fetch Task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  // Add Task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()

    setTasks([...tasks, data])
    // console.log(task)

    // Random Number for the ID
    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
  }

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE',
    })

    // console.log('delete', id)
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updatedTask = {...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updatedTask)
    })

    const data = await res.json()

    // console.log('Reminder' , id)
    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: data.reminder } : task))
  }

  return (
    <Router>
      <div className="container">
        {/*Sending prop.title to Header.js & will override the default title*/}
        <Header title={'Task Tracker'} onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
        {/* If the path is '/', it will render the AddTask & the Task List components */}
        <Route path='/' exact render={(props) => (
          <>
            {/* We can add logic into the return. Keep it inside {} */}
            {showAddTask && <AddTask onAdd={addTask} />}
            {tasks.length > 0 ? 
              <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
            : 'No Tasks To Show'}
          </>
        )} />
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  );
}

// Class Example
// class App extends React.Component {
//   render() {
//     return <h1>Hello from a class</h1>
//   }
// }

export default App;
