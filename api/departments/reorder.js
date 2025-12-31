const { supabase } = require('../../lib/supabase')

export default async function handler(req, res) {
  if (req.method !== 'PATCH') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const updates = req.body // [{id, position}, ...]

  if (!Array.isArray(updates) || updates.length === 0) {
    return res.status(400).json({ error: 'Invalid payload' })
  }

  try {
    for (const dept of updates) {
      const { error } = await supabase
        .from('departments')
        .update({ position: dept.position })
        .eq('id', dept.id)

      if (error) throw error
    }

    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('Failed to reorder departments:', err)
    return res.status(500).json({ error: err.message })
  }
}
