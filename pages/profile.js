import {Auth, Typography, Button} from "@supabase/ui";

const {Text} = Typography
import {supabase} from '../api'

function Profile(props) {
    const {user} = Auth.useUser();
    if (user)
        return (
            <>
                <Text>Signed in: {user.email}</Text>
                <div>
                    <Button className="w-20" onClick={() => props.supabaseClient.auth.signOut()}>
                        Sign out
                    </Button>
                </div>

            </>
        );
    return props.children
}

export default function AuthProfile() {
    return (
        <div className="mx-auto w-1/2">
            <Auth.UserContextProvider supabaseClient={supabase}>
                <Profile supabaseClient={supabase}>
                    <Auth supabaseClient={supabase}/>
                </Profile>
            </Auth.UserContextProvider>
        </div>
    )
}
