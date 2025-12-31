import React, { useEffect, useState } from 'react'
import GroceryList from './GroceryList'

function App() {
  const [items, setItems] = useState([])

  useEffect(() => {
    // Fetch items from your API for list 1
    fetch('https://<your-project>.vercel.app/api/lists/1/items')
      .then(res => res.json())
      .then(data => setItems(data))
  }, [])

  const handleReorder = async (updatedItems) => {
    const payload = updatedItems.map((item, index) => ({
      id: item.id,
      position: (index + 1).toString().padStart(3, '0'),
    }))

    await fetch('https://grocery-9d98f8cvw-john-intorcios-projects.vercel.app/api/items/reorder', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    setItems(updatedItems)
  }

  return (
    <div>
      <h1>My Grocery List</h1>
      <GroceryList items={items} onReorder={handleReorder} />
    </div>
  )
}

export default App
