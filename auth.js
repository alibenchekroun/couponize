// Initialize Supabase client
const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseKey = 'YOUR_SUPABASE_ANON_KEY'
const supabase = supabase.createClient(supabaseUrl, supabaseKey)

// Authentication functions
async function signUp(email, password) {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    })
    if (error) throw error
    return data
}

async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })
    if (error) throw error
    return data
}

async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
}

// User data functions
async function saveUserData(userId, userData) {
    const { data, error } = await supabase
        .from('users')
        .insert([
            {
                id: userId,
                ...userData
            }
        ])
    if (error) throw error
    return data
}

async function getUserData(userId) {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()
    if (error) throw error
    return data
}

// Export functions
export { signUp, signIn, signOut, saveUserData, getUserData }
