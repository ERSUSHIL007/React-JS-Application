import { useState } from 'react'
import './App.css'
import { users as defaultUsers } from './utils/util'

function App() {
  const [users, setUsers] = useState(defaultUsers)

  return (
    <div className='user-list'>
      {users.map((user) => {
        return (
          <button
            className='user-button'
            key={user.id}
            onClick={() => setUsers(users.filter((u) => u.id !== user.id))}
          >
            {user.name}
          </button>
        )
      })}
    </div>
  )
}

export default App
