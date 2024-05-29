import axios from "axios";
import { setCookie } from "cookies-next";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('access_token')?.value;
  const refreshToken = cookieStore.get('refresh_token')?.value;
  const path = request.nextUrl.pathname;

  

  const setRefreshToken = async (token: string) => {
    console.log('====================================');
  console.log("Access token:", accessToken);
  console.log("Refresh token:", refreshToken);
  console.log('====================================');
    try {
      const response = await axios.post('http://localhost:5000/auth/refresh', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      const data = response.data;
      console.log('====================================');
      console.log("there is some data");
      console.log('====================================');
      setCookie('access_token', data.access_token);
      setCookie('refresh_token', data.refresh_token);
      return NextResponse.next();
    } catch (error) {
      // console.log('====================================');
      // console.log("Error refreshing tokens:", error);
      // console.log('====================================');
      console.log('====================================');
      console.log("there is some error");
      console.log('====================================');
      setCookie('access_token', undefined);
      setCookie('refresh_token', undefined);
      return NextResponse.redirect(new URL('/signin', request.url));
    }
  }

 console.log('====================================');
 console.log(refreshToken, accessToken,path !== "/signin",path !== "/signup" );
 console.log('====================================');
  if (!refreshToken && !accessToken &&  path !== "/signin" && path !== "/signup") {
    // console.log('====================================');
    // console.log("Attempting to refresh token");
    // console.log('====================================');
   // return NextResponse.redirect(new URL('/signin', request.url));
    return NextResponse.next()
  }else if(refreshToken && accessToken && path !== "/signin" && path !== "/signup"){
    return NextResponse.next()
  }

  // If tokens are missing and the request is not for sign-in or sign-up, redirect to sign-in
  // if (!accessToken && !refreshToken && path !== "/signin" && path !== "/signup") {
  //   return NextResponse.redirect(new URL('/signin', request.url));
  // }

  // Allow the request to proceed
 return NextResponse.next();
}
