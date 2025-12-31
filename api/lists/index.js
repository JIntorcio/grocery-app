const { supabase } = require('../../../lib/supabase')

export default async function handler(req, res) {
  console.log('ENV:', process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY ? 'KEY SET' : 'KEY MISSING')

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { data, error } = await supabase
      .from('grocery_lists')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) throw error

    return res.status(200).json(data)
  } catch (err) {
    console.error('Supabase query failed:', err)
    return res.status(500).json({ error: err.message })
  }
}
