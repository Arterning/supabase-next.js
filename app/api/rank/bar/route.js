// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {NextResponse} from "next/server";
import {supabase} from "../../../../api";

export async function GET(req, res) {
    const mockData = [
        ['上海', 24.25],
        ['卡拉奇', 23.50],
        ['北京', 21.51],
        ['德里', 16.78],
        ['拉各斯', 16.06],
        ['天津', 15.20],
        ['伊斯坦布尔', 14.16],
        ['东京', 13.51],
        ['广州', 13.08],
        ['孟买', 12.44],
        ['莫斯科', 12.19],
        ['圣保罗', 12.03],
        ['深圳', 10.46],
        ['雅加达', 10.07],
        ['拉合尔', 10.05],
        ['首尔', 9.99],
        ['武汉', 9.78],
        ['金沙萨', 9.73],
        ['开罗', 9.27],
        ['墨西哥', 8.87]
    ];

    const data = [
        ['小慧', 24.25],
        ['宁哥', 53.50],
    ]

    return NextResponse.json({
        data
    })
}
