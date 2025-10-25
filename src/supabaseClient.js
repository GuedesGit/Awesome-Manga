import { createClient } from '@supabase/supabase-js';


const supabaseUrl = 'https://eepwzjikyqscklrcuvhd.supabase.co'; 
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVlcHd6amlreXFzY2tscmN1dmhkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA1MDAzMTUsImV4cCI6MjA3NjA3NjMxNX0.QGAqkY2ttUKNKAQHp6thTpH58Jy-TvowawzhoLJkHQc'; // Substitui pela tua public key
export const supabase = createClient(supabaseUrl, supabaseKey);
