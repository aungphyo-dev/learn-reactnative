import 'react-native-url-polyfill/auto'
import {createClient} from "@supabase/supabase-js";


const options = {
    auth: {
        autoRefreshToken: true,
    }
}
const supabase = createClient("https://rvfstgyjufrxnaindhkb.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2ZnN0Z3lqdWZyeG5haW5kaGtiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ3NDkwMzksImV4cCI6MjAxMDMyNTAzOX0.JoSe8J0Yw4wmbB--XnrFXcGMO_g19KXtUZ9bkgXn6_Y", options)

export default supabase