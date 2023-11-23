import {Auth, Typography, Button} from "@supabase/ui";

const {Text} = Typography
import {supabase} from '../api'

function Profile(props) {
    const {user} = Auth.useUser();
    if (user)
        return (
            <div className={"flex flex-col justify-center items-center"}>
                <span className="w-[300px] m-0 p-3 font-semibold text-2xl bg-teal-100/50 rounded-full">
                    Personal Information
                </span>
                <div className="mt-3 w-[350px] flex items-center justify-items-start shadow-lg border-2 rounded-2xl p-4 w-[100px]">
                    <img
                        className="w-12 h-12 rounded-full mr-4"
                        src="/chair.jpg"
                        alt="User Avatar"/>
                    <div className={"ml-3"}>
                        <Text>Signed in: {user.email}</Text>
                        <p className="text-sm text-gray-600">Address: China</p>
                        <p className="text-sm text-gray-600">BirthDate: 1998/12/19</p>
                        <div className="mt-3">
                            <Button className="w-20" onClick={() => props.supabaseClient.auth.signOut()}>
                                Sign out
                            </Button>
                        </div>
                    </div>
                </div>
                <div className={"w-[182px] mt-3 rounded-sm bg-gray-300 w-1/2 flex-grow"}>
                    <span>Welcome, You did a really good job</span>
                </div>
            </div>
        );
    return props.children
}

export default function AuthProfile() {
    return (
        <div>
            <Auth.UserContextProvider supabaseClient={supabase}>
                <Profile supabaseClient={supabase}>
                    <Auth supabaseClient={supabase}/>
                </Profile>
            </Auth.UserContextProvider>
        </div>
    )
}
