import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pfgykgkjucidwlmxtxij.supabase.co'
const supabaseKey = 'sb_publishable_CV84RV1zgh-wYmCxgs4apA_yLbzRLWP'

export const supabase = createClient(supabaseUrl, supabaseKey)