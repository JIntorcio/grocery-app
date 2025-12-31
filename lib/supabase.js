const { createClient } = require('@supabase/supabase-js')

// Create a Supabase client using environment variables
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: { persistSession: false },
  }
)

module.exports = { supabase }
