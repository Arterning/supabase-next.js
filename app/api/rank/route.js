// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {NextResponse} from "next/server";

export async function GET (req, res) {
  const mock_xiaohui = [[1689177600000, 50.52], [1690128000000, 147.36], [1690878539465, 146.95]]
  const mock_ning = [[1689177600000, 20.52], [1690128000000, 55.36], [1690878539465, 65.95]]

  return NextResponse.json({
    xiaohui: mock_xiaohui,
    ning: mock_ning,
  })
}
