import TodoList from '@/components/TodoList'

export default function TodoPage() {

    return (
        <>
            <div className="w-full h-screen bg-grass-pattern bg-no-repeat">
                {
                    <div
                        className="flex flex-col justify-center items-center p-4"
                        style={{minWidth: 250, maxWidth: 600, margin: 'auto'}}
                    >
                        <TodoList/>
                    </div>
                }
            </div>
        </>
    )
}
