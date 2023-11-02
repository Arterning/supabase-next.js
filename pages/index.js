import Head from 'next/head'
import Link from 'next/link'
import { supabase } from '../api'


async function fetchPosts() {
    const { data, error } = await supabase
        .from('posts')
        .select()
    return data
}

export async function getStaticProps() {
    const posts = await fetchPosts();
    return {
        props: {
            posts,
            revalidate: 3,
        }
    }
}

export default function Home({ posts }) {

    if (!posts) return <p className="text-2xl">No posts.</p>

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
            <div className="float-right w-3/6 h-full ">
                <img src="/my.jpg" className="rounded-2xl" alt={"good"}/>
            </div>
        </div>
    );
}
