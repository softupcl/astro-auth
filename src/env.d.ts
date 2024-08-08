/// <reference path="../.astro/actions.d.ts" />
/// <reference types="astro/client" />


interface User {
    email : string;
    nombre : string;
    avatar : string;
    emailVerificado : boolean;
}

declare namespace App {
    interface Locals {
        isLoggedIn : boolean;
        user : User | null
    }
}