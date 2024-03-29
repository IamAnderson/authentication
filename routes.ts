//This routes are publicly accessible 
export const publicRoutes =[
    "/", "/auth/new-verification",
];

//Used for authentication
//This routes will redirect logged in users to /settings
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/reset",
    "/auth/new-password",
];

//Prefix for API authentication routes 
export const apiAuthPrefix = "/api/auth";

//Default redirect ater logging in
export const DEFAULT_LOGIN_REDIRECT = "/settings"