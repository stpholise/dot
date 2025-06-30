import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

 export function middleware(request: NextRequest) {
   const pathname = request.nextUrl.pathname 

    if ( pathname === '/'){
        return NextResponse.rewrite( new URL('/home', request.url))
    }
    return NextResponse.next()
 }

 export const config = {
    matcher: ['/'],
 }