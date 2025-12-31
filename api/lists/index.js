// Correct relative path to your Supabase client
const { supabase } = require('../../lib/supabase')

export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Check that environment variables exist
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.error('Supabase environment variables are missing!')
    return res.status(500).json({ error: 'Supabase environment variables not set' })
  }

  try {
    // Query grocery_lists table
    const { data, error } = await supabase
      .from('grocery_lists')
      .select('*')
      .order('created_at', { ascending: true })

    if (error) throw error

    // Return JSON response
    return res.status(200).json(data)
  } catch (err) {
    console.error('Supabase query failed:', err)
    return res.status(500).json({ error: err.message })
  }
}
