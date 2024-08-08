import type { MiddlewareNext } from "astro";
import { defineMiddleware } from "astro:middleware";
import { firebase } from "../firebase/config";

const privateRoutes = ['/privado'];
const publicRoutes = ['/login', '/registro']

export const onRequest = defineMiddleware(({ url, request, locals, redirect }, next) => {

    const isLoggedIn = !!firebase.auth.currentUser;
    const user = firebase.auth.currentUser;
    
    locals.isLoggedIn = isLoggedIn;
    if(user) {
        locals.user = {
            avatar : user.photoURL ?? '',
            email : user.email!,
            nombre : user.displayName!,
            emailVerificado : user.emailVerified
        }
    }

    if(!isLoggedIn && privateRoutes.includes(url.pathname)){
        return redirect('/')
    }

    if(isLoggedIn && publicRoutes.includes(url.pathname)){
        return redirect('/')
    }

    
    return next();
});

