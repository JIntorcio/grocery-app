import React, { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

export default function GroceryList({ items, onReorder }) {
  const [localItems, setLocalItems] = useState(items)

  const handleDragEnd = (result) => {
    if (!result.destination) return

    const updatedItems = Array.from(localItems)
    const [moved] = updatedItems.splice(result.source.index, 1)
    updatedItems.splice(result.destination.index, 0, moved)

    setLocalItems(updatedItems)
    onReorder(updatedItems)
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="grocery-list">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {localItems.map((item, index) => (
              <Draggable key={item.id} draggableId={String(item.id)} index={index}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {item.name} ({item.department})
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  )
}
