import { Auth } from '@supabase/auth-ui-react'
import {
    ThemeSupa,
} from '@supabase/auth-ui-shared'
import {supabase} from "../api";


const App = () => (
    <div className="w-1/2 mx-auto">
        <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={['google', 'facebook', 'twitter']}
        />
    </div>

)

export default App
