import TodoList from '@/components/TodoList'

export default function TodoPage() {

    return (
        <>
            <div className="w-full h-full bg-white-200">
                {
                    <div
                        className="w-full h-full flex flex-col justify-center items-center p-4"
                        style={{minWidth: 250, maxWidth: 600, margin: 'auto'}}
                    >
                        <TodoList/>
                    </div>
                }
            </div>
        </>
    )
}
