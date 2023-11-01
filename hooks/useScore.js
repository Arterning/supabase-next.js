import {supabase} from "api";

export default function useScore() {

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

        // 执行 upsert 操作
        const dataToUpsert = {
            user_id: user_id,
            vv: score + 3
        }
        supabase
            .from('ranks')
            .upsert([
                dataToUpsert
            ], { onConflict: ['user_id'], set: { vv: score + 3 } })
            .then(({ data, error }) => {
                if (error) {
                    console.error('更新或插入数据时发生错误:', error);
                } else {
                    console.log('更新或插入成功:', data);
                }
            });
    }

    async function insert() {
        await supabase.from('ranks')
            .insert([
                {user_id: user.id, vv: 0}
            ])
    }

    // 之前这里定义的顺序高反了 调用粗了函数 找了半天原因。
    return [upsert, getScore]
}
