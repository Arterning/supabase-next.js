import {useEffect, useState} from 'react'
import {supabase} from '../api'
import '../styles/globals.css'
import {NProgress} from "../components/NProgress";
import Header from "../components/Header";


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
    <div className={"h-full"}>
      <Header user={user}/>
      <div style={{height: '100%'}}>
        <NProgress/>
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default MyApp
