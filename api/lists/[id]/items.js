const { supabase } = require('../../../lib/supabase')

export default async function handler(req, res) {
  const { id } = req.query

  if (!id) {
    return res.status(400).json({ error: 'Missing list ID' })
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Supabase environment variables are missing!')
    return res.status(500).json({ error: 'Supabase environment variables not set' })
  }

  try {
    const { data, error } = await supabase
      .from('grocery_items')
      .select('*')
      .eq('list_id', id)
      .order('department', { ascending: true })
      .order('position', { ascending: true })

    if (error) throw error

    return res.status(200).json(data)
  } catch (err) {
    console.error('Supabase query failed:', err)
    return res.status(500).json({ error: err.message })
  }
}
