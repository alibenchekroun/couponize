// Initialize Supabase client
const supabaseUrl = 'https://gvmwcbnumuffpkkjehpf.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2bXdjYm51bXVmZnBra2plaHBmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0Njc3MzM4NSwiZXhwIjoyMDYyMzQ5Mzg1fQ.PL1qqnjRlltrL-4M29Un41TDmVy--crEycT61AQOpdo'

// Import the Supabase client
import { createClient } from '@supabase/supabase-js'

// Initialize the Supabase client
const supabase = createClient(supabaseUrl, supabaseKey)

// Check if Supabase is initialized
console.log('Supabase client initialized:', supabase)

// Authentication functions
async function signUp(email, password) {
    console.log('Attempting to sign up with:', { email });
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    })
    console.log('Sign up result:', { data, error });
    if (error) throw error
    return data
}

async function signIn(email, password) {
    console.log('Attempting to sign in with:', { email });
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })
    console.log('Sign in result:', { data, error });
    if (error) throw error
    return data
}

async function signOut() {
    console.log('Attempting to sign out');
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    console.log('Successfully signed out');
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
