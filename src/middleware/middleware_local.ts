import type { MiddlewareNext } from "astro";
import { defineMiddleware } from "astro:middleware";

const privateRoutes = ['/privado'];

export const onRequest = defineMiddleware(({ url, request }, next) => {

    const authHeaders = request.headers.get('authorization') ?? '';

    if (privateRoutes.includes(url.pathname)) {
        return checkLocalAuth(authHeaders, next);
    }


    return next();
});

const checkLocalAuth = (authHeaders: string, next: MiddlewareNext) => {

    if (!authHeaders) {
        const authValue = authHeaders.split(' ').at(-1) ?? 'user:pass';
        const decodedValue = atob(authValue).split(':');
        const [user, password] = decodedValue;

        if (user === 'admin' && password === 'admin') {
            return next();
        }
    }



    return new Response('Auth Necesario', {
        status: 401,
        headers: {
            'WWW-Authenticate': 'Basic real="Secure Area"'
        }
    });


    return next();
}