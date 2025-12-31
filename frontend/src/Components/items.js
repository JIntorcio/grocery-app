// src/components/items.js
import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export default function SortableItem({ id, name }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: '8px 12px',
    marginBottom: '4px',
    border: '1px solid #ccc',
    borderRadius: '6px',
    background: '#fff',
    cursor: 'grab',
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {name}
    </div>
  )
}
