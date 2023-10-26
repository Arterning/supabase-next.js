import Link from "next/link";
import ThemeSwitch from "./ThemeSwitch";

export default function Header({user}) {
    return <nav className="p-6 border-b border-gray-300">
        <Link href="/" className="m-6 p-3 rounded hover:bg-green-600">
            Home
        </Link>
        {user && (
            <>
                <Link href="/create-post" className="m-6 p-3 rounded hover:bg-green-600">
                    Create Post
                </Link>
                <Link href="/my-posts" className="m-6 p-3 rounded hover:bg-green-600">
                    My Posts
                </Link>
                <Link href="/todo" className="m-6 p-3 rounded hover:bg-green-600">
                    TodoTasks
                </Link>
                <Link href="/rank" className="m-6 p-3 rounded hover:bg-green-600">
                    Rank
                </Link>
            </>
        )}
        <Link href="/profile" className="m-6 p-3 rounded hover:bg-green-600">
            Profile
        </Link>
        <ThemeSwitch/>
    </nav>;
}
