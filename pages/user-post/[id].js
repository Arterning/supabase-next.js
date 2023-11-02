// pages/my-posts.js
import Link from 'next/link'
import { supabase } from '../../api'

async function fetchPosts() {
  const { data } = await supabase
      .from('posts')
      .select('*')
  return data;
}


export default function UserPost({posts}) {

  async function deletePost(id) {
    const result = window.confirm('您确定要删除吗？');
    if (!result) {
      return;
    }
    await supabase
      .from('posts')
      .delete()
      .match({ id })
  }

  if (!posts) return <p className="text-2xl">No posts.</p>


  return (
    <div>
      <h1 className="text-3xl font-semibold tracking-wide mt-6 mb-2">My Posts</h1>
      {
        posts.map((post, index) => (
          <div key={index} className="border-b border-gray-300	mt-8 pb-4">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-gray-500 mt-2 mb-2">Author: {post.user_email}</p>
            <Link href={`/edit-post/${post.id}`} className="text-sm mr-4 text-blue-500">Edit Post</Link>
            <Link href={`/posts/${post.id}`} className="text-sm mr-4 text-blue-500">View Post</Link>
            <button
              className="text-sm mr-4 text-red-500"
              onClick={() => deletePost(post.id)}
            >Delete Post</button>
          </div>
        ))
      }
    </div>
  );
}


export async function getStaticPaths() {
  const { data, error } = await supabase
      .from('posts')
      .select()
  const userIds = new Set();
  if (!data) {
    return {
      paths: [],
      fallback: true
    }
  }
  const paths = data
      .filter(post => {
        if (!userIds.has(post.user_id)) {
          userIds.add(post.user_id);
          return true;
        }
        return false;
      }).map(post => ({ params: { id: JSON.stringify(post.user_id) }}))
  return {
    paths,
    fallback: true
  }
}

export async function getStaticProps ({ params: { id } }) {
  const all = await fetchPosts();
  const posts = all.filter(post => post.user_id === id);
  return {
    props: {
      posts,
      revalidate: 3,
    }
  }
}
