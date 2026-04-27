import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://djvxzugtiqriezgyvqyv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqdnh6dWd0aXFyaWV6Z3l2cXl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcyMTk3NjIsImV4cCI6MjA5Mjc5NTc2Mn0._qu7UYOHA778j9rfZIKXvZLrCrKp8qiFl-HVr5zbWM0';

export const supabase = createClient(supabaseUrl, supabaseKey);
