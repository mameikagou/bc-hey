import { NextResponse } from 'next/server';
export async function GET(req: Request, res: Response) {
    const {searchParams} = new URL(req.url)
    const id = searchParams.get('id')
    console.log("id",id)
    if(!id){
        return NextResponse.json({ message: "id is need" })
    }
    return NextResponse.json({ message: {"":"Hey API ✨","id":id} })
}