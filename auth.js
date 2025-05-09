// Initialize Supabase client
const supabaseUrl = 'https://gvmwcbnumuffpkkjehpf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2bXdjYm51bXVmZnBra2plaHBmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0Njc3MzM4NSwiZXhwIjoyMDYyMzQ5Mzg1fQ.PL1qqnjRlltrL-4M29Un41TDmVy--crEycT61AQOpdo'
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
