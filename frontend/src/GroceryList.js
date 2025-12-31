import React, { useState } from 'react'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

// Single sortable item
function SortableItem({ id, name, department }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: '8px',
    border: '1px solid #ccc',
    marginBottom: '4px',
    borderRadius: '4px',
    background: '#fff',
  }
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {name} ({department})
    </div>
  )
}

// Main grocery list component
export default function GroceryList({ items, onReorder }) {
  const [localItems, setLocalItems] = useState(items)
  const sensors = useSensors(useSensor(PointerSensor))

  const handleDragEnd = (event) => {
    const { active, over } = event
    if (active.id !== over.id) {
      const oldIndex = localItems.findIndex(item => item.id === active.id)
      const newIndex = localItems.findIndex(item => item.id === over.id)
      const newItems = arrayMove(localItems, oldIndex, newIndex)
      setLocalItems(newItems)
      onReorder(newItems)
    }
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={localItems.map(i => i.id)} strategy={verticalListSortingStrategy}>
        {localItems.map(item => (
          <SortableItem key={item.id} id={item.id} name={item.name} department={item.department} />
        ))}
      </SortableContext>
    </DndContext>
  )
}
