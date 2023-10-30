import {Auth, Typography, Button} from "@supabase/ui";

const {Text} = Typography
import {supabase} from '../api'

function Profile(props) {
    const {user} = Auth.useUser();
    if (user)
        return (
            <div>
                <div className="flex items-center shadow-lg border-2 w-1/2 h-30 rounded-2xl p-4">
                    <img
                        className="w-12 h-12 rounded-full mr-4"
                        src="/chair.jpg"
                        alt="User Avatar"/>
                    <div>
                        <Text>Signed in: {user.email}</Text>
                        <p className="text-sm text-gray-600">Address: China</p>
                        <p className="text-sm text-gray-600">BirthDate: 1998/12/9</p>
                        <div className="mt-3">
                            <Button className="w-20" onClick={() => props.supabaseClient.auth.signOut()}>
                                Sign out
                            </Button>
                        </div>
                    </div>
                </div>

            </div>
        );
    return props.children
}

export default function AuthProfile() {
    return (
        <div className="w-1/2 mx-auto">
            <Auth.UserContextProvider supabaseClient={supabase}>
                <Profile supabaseClient={supabase}>
                    <Auth supabaseClient={supabase}/>
                </Profile>
            </Auth.UserContextProvider>
        </div>
    )
}
