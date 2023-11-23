import TodoList from '@/components/TodoList'

export default function TodoPage() {

    return (
        <>
            {/*使用tailwind 遇到的问题：
            1.w-[100px]不生效，解决：升级了版本，重装node_modules,修改config文件
            2. 背景图片高度没有完全覆盖 使用w-full 不起效果
            */}
            <div className="w-full h-full bg-grass-pattern bg-no-repeat">
                {/*希望文字居中的话，上下左右设置一样的padding即可*/}
                <div className={"w-[300px] bg-zink-50 mx-auto p-5 text-xl text-blue-400 bg-green-300/30 rounded-xl"}>
                    今天的任务你完成了吗
                </div>
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
