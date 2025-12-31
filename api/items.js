const { supabase } = require('../lib/supabase')

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Supabase environment variables are missing!')
    return res.status(500).json({ error: 'Supabase environment variables not set' })
  }

  const { list_id, name, department, position, quantity } = req.body

  // Input validation
  if (!list_id || !name || !department || !position) {
    return res.status(400).json({ error: 'Missing required fields: list_id, name, department, position' })
  }

  try {
    const { data, error } = await supabase
      .from('grocery_items')
      .insert([
        {
          list_id,
          name,
          department,
          position,
          quantity: quantity || 1,
        },
      ])
      .select() // Return the inserted row

    if (error) throw error

    return res.status(201).json(data[0])
  } catch (err) {
    console.error('Supabase insert failed:', err)
    return res.status(500).json({ error: err.message })
  }
}
