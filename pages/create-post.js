import {useState} from 'react'
import {v4 as uuid} from 'uuid'
import {useRouter} from 'next/router'
import dynamic from 'next/dynamic'
import "easymde/dist/easymde.min.css"
import {supabase} from '../api'
import {ClipLoader} from "react-spinners";

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {ssr: false})
const initialState = {title: '', content: ''}

function CreatePost() {
    const [post, setPost] = useState(initialState)
    const {title, content} = post
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    function onChange(e) {
        setPost(() => ({...post, [e.target.name]: e.target.value}))
    }

    async function createNewPost() {
        if (!title || !content) {
            alert('请输入标题和内容')
            return
        }
        const user = supabase.auth.user()
        const id = uuid()
        post.id = id
        setLoading(true)
        const {data} = await supabase
            .from('posts')
            .insert([
                {title, content, user_id: user.id, user_email: user.email}
            ])
            .single()


        await upsert(user.id)

        alert('积分+3！！')

        router.push(`/posts/${data.id}`)
    }

    if (loading) return (
        <div className="mx-auto my-auto">
            <ClipLoader color="#36D7B7" loading={loading} size={150} />
        </div>
    )

    async function insert() {
        await supabase.from('ranks')
            .insert([
                {user_id: user.id, vv: 0}
            ])
    }

    async function getScore(user_id) {
        const {data} = await supabase
            .from('ranks')
            .select('vv')
            .filter('user_id', 'eq', user_id)
            .single()
        return data?.vv || 0;
    }

    async function upsert(user_id) {
        const score = await getScore(user_id)
        // alert(score)

        // 执行 upsert 操作
        const dataToUpsert = {
            user_id: user_id,
            vv: score + 100
        }
        supabase
            .from('ranks')
            .upsert([
                dataToUpsert
            ], { onConflict: ['user_id'], set: { vv: score + 100 } })
            .then(({ data, error }) => {
                if (error) {
                    console.error('更新或插入数据时发生错误:', error);
                } else {
                    console.log('更新或插入成功:', data);
                }
            });
    }

    return (
        <div>
            <h1 className="text-3xl font-semibold tracking-wide mt-6">Create new post</h1>
            <input
                onChange={onChange}
                name="title"
                placeholder="Title"
                value={post.title}
                className="border-b pb-2 text-lg my-4 focus:outline-none w-full font-light text-gray-500 placeholder-gray-500 y-2"
            />
            <SimpleMDE value={post.content} onChange={value => setPost({...post, content: value})}/>
            <button
                type="button"
                className="mb-4 bg-green-600 text-white font-semibold px-8 py-2 rounded-lg"
                onClick={createNewPost}
            >Create Post
            </button>
        </div>
    )
}

export default CreatePost
