// src/App.js
import React, { useState, useEffect } from 'react'
import GroceryList from './Components/GroceryList'

function App() {
  const [items, setItems] = useState([])

  // Fetch grocery items from Supabase via Vercel API
  useEffect(() => {
    fetch('https://grocery-app-pi-ten.vercel.app/api/lists/1/items')
      .then(res => res.json())
      .then(data => setItems(data))
  }, [])

  // Item reorder handler
  const handleReorder = async (updatedItems) => {
    const payload = updatedItems.map((item, index) => ({
      id: item.id,
      position: (index + 1).toString().padStart(3, '0'),
    }))

    await fetch('https://grocery-app-pi-ten.vercel.app/api/items/reorder', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    setItems(updatedItems)
  }

  // Department reorder handler
  const handleDeptReorder = async (newDepartments) => {
    const payload = newDepartments.map((dept, index) => ({
      id: dept.items[0]?.department_id || index + 1, // adjust based on your data
      position: (index + 1).toString().padStart(3, '0'),
    }))

    await fetch('https://grocery-app-pi-ten.vercel.app/api/departments/reorder', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '16px' }}>
      <h1>My Grocery List</h1>
      <GroceryList
        items={items}
        onItemReorder={handleReorder}
        onDeptReorder={handleDeptReorder}
      />
    </div>
  )
}

export default App
