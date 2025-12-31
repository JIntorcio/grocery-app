const { supabase } = require('../../../lib/supabase')

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.statusCode = 405
    return res.json({ error: 'Method not allowed' })
  }

  const { data, error } = await supabase
    .from('grocery_lists')
    .select('*')
    .order('created_at', { ascending: true })

  if (error) {
    res.statusCode = 500
    return res.json({ error: error.message })
  }

  res.statusCode = 200
  return res.json(data)
}
