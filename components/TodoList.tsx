import { Database } from '@/lib/schema'
import {FormEvent, useEffect, useState} from 'react'
import { supabase } from 'api'
import {ClipLoader, DotLoader} from "react-spinners";
import useScore from "../hooks/useScore";

type Todos = Database['public']['Tables']['todos']['Row']

export default function TodoList() {
    const [todos, setTodos] = useState<Todos[]>([])
    const [newTaskText, setNewTaskText] = useState('')
    const [errorText, setErrorText] = useState('')
    const [loading, setLoading] = useState(true)
    const [upsert] = useScore()

    const user = supabase.auth.user()

    const fetchTodos = async () => {
        const { data: todos, error } = await supabase
            .from('todos')
            .select('*')
            .order('id', { ascending: true })

        if (error) console.log('error', error)
        else setTodos(todos)
        setLoading(false)
    }

    useEffect(() => {
        fetchTodos().then()
    }, [supabase])

    const addTodo = async (taskText: string) => {
        let task = taskText.trim()
        if (task.length) {
            const { data: todo, error } = await supabase
                .from('todos')
                .insert({ task, user_id: user?.id, remark: '我是一个备注' })
                .select()
                .single()

            if (error) {
                setErrorText(error.message)
            } else {
                setTodos([...todos, todo])
                setNewTaskText('')
            }
        }
    }

    const deleteTodo = async (id: number) => {
        // 显示确认对话框
        const result = window.confirm('您确定要删除吗？');
        if (!result) {
            return;
        }
        try {
            await supabase.from('todos').delete().eq('id', id).throwOnError()
            setTodos(todos.filter((x) => x.id != id))
        } catch (error) {
            console.log('error', error)
        }
    }

    if (loading) return (
        <div className="mx-auto my-auto">
            <ClipLoader color="#36D7B7" loading={loading} size={150} />
        </div>
    )

    async function submit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (!newTaskText) {
            alert('任务名不能为空')
            return;
        }
        await addTodo(newTaskText)
        await upsert(user?.id)
        // alert('积分+3')
    }


    return (
        <div className="w-full">
            <h1 className="mb-12">Todo List.</h1>
            <form
                onSubmit={(e) => submit(e)}
                className="flex gap-2 my-2"
            >
                <input
                    className="rounded w-full p-2 text-gray-800 border-b-2"
                    type="text"
                    placeholder="输入你的任务代办"
                    value={newTaskText}
                    onChange={(e) => {
                        setErrorText('')
                        setNewTaskText(e.target.value)
                    }}
                />
                <button type="submit" className="bg-green-600 text-white font-semibold px-8 py-2 rounded-lg p-2">
                    Add
                </button>
            </form>
            {!!errorText && <Alert text={errorText} />}
            <div className="shadow overflow-hidden rounded-md">
                <ul>
                    {todos.map((todo) => (
                        <Todo key={todo.id} todo={todo} onDelete={() => deleteTodo(todo.id)}/>
                    ))}
                </ul>
            </div>
        </div>
    )
}

const Todo = ({ todo, onDelete }: { todo: Todos; onDelete: () => void }) => {
    const [isCompleted, setIsCompleted] = useState(todo.is_complete)
    const [loading, setLoading] = useState(false)

    const toggle = async () => {
        try {
            setLoading(true)
            const { data } = await supabase
                .from('todos')
                .update({ is_complete: !isCompleted })
                .eq('id', todo.id)
                .throwOnError()
                .select()
                .single()
            setLoading(false)
            if (data) setIsCompleted(data.is_complete)
        } catch (error) {
            console.log('error', error)
        }
    }

    if (loading) return (
        <div className="mx-auto my-auto">
            <DotLoader color="#36D7B7" loading={loading} size={150} />
        </div>
    )

    return (
        <li className="w-full block cursor-pointer hover:bg-green-500 focus:outline-none focus:bg-gray-200 transition duration-150 ease-in-out border-b-2">
            <div className="flex items-center px-4 py-4 sm:px-6">
                <div className="min-w-0 flex-1 flex items-center">
                    <div className={`text-sm leading-5 font-medium truncate ${isCompleted ? 'line-through' : ''}`}>{todo.task}</div>
                </div>
                <div>
                    <input
                        className="cursor-pointer w-6 h-6 rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                        onChange={(e) => toggle()}
                        type="checkbox"
                        checked={isCompleted}
                    />
                </div>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        onDelete()
                    }}
                    className="w-4 h-4 ml-2 border-2 hover:border-black rounded"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray">
                        <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
            </div>
        </li>
    )
}

const Alert = ({ text }: {text: string}): JSX.Element => (
    <div className="rounded-md bg-red-100 p-4 my-3">
        <div className="text-sm leading-5 text-red-700">{text}</div>
    </div>
)
