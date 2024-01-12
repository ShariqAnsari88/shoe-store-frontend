import { NextRequest, NextResponse } from 'next/server'

import { logOut } from '@/utils/auth'

// eslint-disable-next-line import/no-anonymous-default-export
export default async function handler(req: NextRequest) {
  try {
    await logOut(req.cookies)
    NextResponse.json({ message: 'Logged out!' }, { status: 200 })
  } catch (error) {
    console.log(error, 'error')
    NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
