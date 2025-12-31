// src/components/GroceryList.js
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
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import SortableItem from './items'

// Department component
function SortableDepartment({ id, name, items }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: '12px',
    marginBottom: '20px',
    border: '2px solid #888',
    borderRadius: '8px',
    background: '#f0f4f8',
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <h3 {...listeners} style={{ margin: 0, marginBottom: '8px', fontSize: '1.1rem' }}>{name}</h3>
      <SortableContext items={items.map(i => i.id)} strategy={verticalListSortingStrategy}>
        {items.map(item => (
          <SortableItem key={item.id} id={item.id} name={item.name} />
        ))}
      </SortableContext>
    </div>
  )
}

// Main grocery list component
export default function GroceryList({ items, onItemReorder, onDeptReorder }) {
  const [localItems, setLocalItems] = useState(items)
  const sensors = useSensors(useSensor(PointerSensor))

  // Group items by department
  const departments = [...new Set(localItems.map(i => i.department))]
    .map(name => ({
      name,
      items: localItems.filter(i => i.department === name),
    }))

  // Department drag end
  const handleDeptDragEnd = (event) => {
    const { active, over } = event
    if (!over || active.id === over.id) return

    const oldIndex = departments.findIndex(d => d.name === active.id)
    const newIndex = departments.findIndex(d => d.name === over.id)
    const newDepartments = arrayMove(departments, oldIndex, newIndex)

    // Flatten items in new order
    const newItems = newDepartments.flatMap(d => d.items)
    setLocalItems(newItems)
    if (onDeptReorder) onDeptReorder(newDepartments)
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDeptDragEnd}>
      <SortableContext items={departments.map(d => d.name)} strategy={verticalListSortingStrategy}>
        {departments.map(dept => (
          <SortableDepartment
            key={dept.name}
            id={dept.name}
            name={dept.name}
            items={dept.items}
          />
        ))}
      </SortableContext>
    </DndContext>
  )
}
