import axios from "axios";
import { setCookie } from "cookies-next";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const isLoggedIn: boolean = true
export function middleware(request: NextRequest){
  const cookieStore = cookies();
  const accessToken = cookieStore.get('access_token')?.value
  const refreshToken = cookieStore.get('refresh_token')?.value
 console.log('====================================');
 console.log(accessToken, refreshToken);
 console.log('====================================');
  const setRefreshToken = async(token:string)=>{
    await axios.post('http://localhost:5000/auth/refresh',{}, {
      // Optional headers, such as authorization headers if needed
      headers: {
          Authorization: `Bearer ${token}`
      }
      })
      .then((res)=>{
        const data = res.data
        setCookie('access_token',data.access_token)
        setCookie('refresh_token',data.refresh_token)
       return NextResponse.next()
       console.log('====================================');
       console.log(res.data);
       console.log('====================================');
      })
      .catch((error)=>{
        console.log('====================================');
        console.log(error);
        console.log('====================================');
        NextResponse.redirect(new URL('/signin',request.url))
      })
  }
  if(refreshToken && accessToken){
    setRefreshToken(refreshToken)
 }
 else{
  return NextResponse.redirect(new URL('/signin',request.url))
 }
   
}
