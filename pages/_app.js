import Link from 'next/link'
import { useState, useEffect } from 'react'
import { supabase } from '../api'
import '../styles/globals.css'
import {NProgress} from "../components/NProgress";
import ThemeSwitch from "../components/ThemeSwitch";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(checkUser)
    checkUser()
    return () => {
      authListener?.unsubscribe()
    };
  }, [])
  function checkUser() {
    const user = supabase.auth.user()
    setUser(user)
  }
  return (
    <div>
      <nav className="p-6 border-b border-gray-300">
        <Link href="/" className="m-6 p-3 rounded hover:bg-green-600">
          Home
        </Link>
        {
          user && (
            <Link href="/create-post" className="m-6 p-3 rounded hover:bg-green-600">
              Create Post
            </Link>
          )
        }
        {
          user && (
            <Link href="/my-posts" className="m-6 p-3 rounded hover:bg-green-600">
              My Posts
            </Link>
          )
        }
        {
          user && (
            <Link href="/todo" className="m-6 p-3 rounded hover:bg-green-600">
              TodoTasks
            </Link>
          )
        }
        <Link href="/profile" className="m-6 p-3 rounded hover:bg-green-600">
          Profile
        </Link>
        <ThemeSwitch />
      </nav>
      <div className="py-8 px-16">
        <NProgress />
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp
