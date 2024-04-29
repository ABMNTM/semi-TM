import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { refreshTokenKey } from "./helpers/axios";
import { jwtDecode } from "jwt-decode";

// const AccessTokenTest = async (request: NextRequest) => {
//   console.log("start AccessT. ...");
//   const accessToken = request.cookies.get(accessTokenKey);

//   if (!(accessToken && accessToken.value)) {
//     console.log("AccessT. returns in not exist stmt.");
//     return false;
//   }

//   try {
//     const accessExp = jwtDecode(accessToken.value).exp;
//     const result = accessExp && !(accessExp * 1000 <= Date.now());
//     console.log("AccessT. returns in expired token stmt by result = ", result);
//     return result;
//   } catch (e) {
//     console.log("AccessT : error in access token decode :", e);
//     return false;
//   }
// };

// async function TestToken2(request: NextRequest) {
//   const refreshToken = request.cookies.get(refreshTokenKey);

//   if (!(refreshToken && refreshToken.value)) {
//     console.log("refrestT : return in not exist stmt.");
//     return false;
//   } // refresh token not exists.

//   try {
//     const refrExp = jwtDecode(refreshToken.value).exp;
//     if (refrExp && !(refrExp * 1000 <= Date.now())) {
//       console.log("refreshT : refresh token is not expired.");
//       // access token test ...
//       if (await AccessTokenTest(request)) {
//         console.log("refreshT : both tokens are useable.");
//         return true; // both tokens are useable.
//       } else {
//         console.log("refreshT : go to get new access token");
//         // go to get new access token ...
//         // FIXIT : there is an error while fetching axios API. (adapter)
//         // const newAccessToken = await axios.post(baseURL + "/token/refresh/", {
//         //   refresh: refreshToken.value,
//         // });
//         // request.cookies.set(accessTokenKey, newAccessToken.data);
//         const INIdata = {
//           refresh: refreshToken.value,
//         };
//         const res = await fetch(baseURL + "/token/refresh/", {
//           method: "POST",
//           body: JSON.stringify(INIdata),
//         });
//         const accessToken = await res.json();
//         request.cookies.set(accessTokenKey, accessToken.access);
//         console.log("AccessT : new access token gotted and go to continue ...");
//         return true; // new access token set.
//       }
//     } else {
//       console.log("refreshT : refresh token is expired.");
//       return false; // refresh token expired.
//     }
//   } catch (error) {
//     console.error("Error decoding refresh token:", error);
//     return false;
//   }
// }

const TestToken = async (req: NextRequest) => {
  const refreshToken = req.cookies.get(refreshTokenKey);

  if (!refreshToken) {
    return false; // Early return if no refresh token
  }

  console.log("Token exists");

  try {
    const refrExp = jwtDecode(refreshToken.value).exp;
    const result = refrExp && refrExp * 1000 > Date.now();
    console.log("Token expiration :", !result);
    return result;
  } catch (error) {
    console.error("Error decoding refresh token:", error);
    return false;
  }
};

export default async function middleware(request: NextRequest) {
  const authorized = await TestToken(request);
  if (authorized) {
    if (request.nextUrl.pathname.startsWith("/auth")) {
      return NextResponse.redirect(new URL("/a", request.url));
    } else {
      return NextResponse.next();
    }
  } else {
    if (request.nextUrl.pathname.startsWith("/auth")) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/auth", request.url));
    }
  }
}

export const config = {
  matcher: ["/a/:path*", "/auth"],
};
