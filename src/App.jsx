
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([])
  useEffect(()=>{
    fetch("http://localhost:5000/users")
    .then(res => res.json())
    .then(data => setUsers(data))
  },[])

  const handleAddUser = event =>{
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const user = {name , email}
    console.log(user);
    fetch('http://localhost:5000/users',{
      method: 'POST',
      headers: {
        'content-type':'application/json'
      },
      body: JSON.stringify(user)
    }
    )
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const newUser = [...users, data];
      setUsers(newUser);
      form.reset();
    })
  }
  return (

    <>

    <form onSubmit={handleAddUser}>
      <input type="text" name="name" id="" placeholder='Enter name' />
      <br />
      <input type="email" name="email" id="" placeholder='Enter email' />
      <br />
      <input type="submit" value="Add user" />
    </form>

      <h1>User Management System</h1>
      <h3>Total user number: {users.length}</h3>
      <div>
        {
          users.map(user => <p key={user.id}>
            {user.id} {user.name} 
            <br />
          {user.email}</p>)
        }
      </div>
    </>
  )
}

export default App
