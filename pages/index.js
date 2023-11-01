import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { supabase } from '../api'
import {ClipLoader} from 'react-spinners';

export default function Home() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetchPosts()
    const mySubscription = supabase
      .from('posts')
      .on('*', () => {
        console.log('something happened....')
        fetchPosts()
      })
      .subscribe()
    return () => supabase.removeSubscription(mySubscription)
  }, [])
  async function fetchPosts() {
    const { data, error } = await supabase
      .from('posts')
      .select()
    setPosts(data)
    setLoading(false)
  }
  if (loading) return (
      <div className="w-full h-ful">
          <ClipLoader className="mx-auto my-auto" color="#36D7B7" loading={loading} size={150} />
      </div>
  )
  if (!posts?.length) return <p className="text-2xl">No posts.</p>

  return (
    <div>
      <Head>
        <title>ArterNing Work</title>
      </Head>

      <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">Posts</h1>
        <div className="float-left w-2/6">
          {
            posts.map(post => (
              (<Link
                key={post.id}
                href={`/posts/${post.id}`}
                className="block border-b border-gray-300  mt-8 pb-4">

                <h2 className="text-xl font-semibold">{post.title}</h2>
                <p className="text-gray-500 mt-2">Author: {post.user_email}</p>
              </Link>))
            )
          }
        </div>
      <div className="float-right w-4/6 h-full">
        <img src="/webb1.jpg"/>
      </div>
    </div>
  );
}
