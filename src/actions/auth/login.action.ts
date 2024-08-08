import { defineAction } from "astro:actions";
import { signInWithEmailAndPassword, type AuthError } from "firebase/auth";
import { firebase } from "../../firebase/config";
import { object, z } from "astro/zod";

export const login = defineAction({
    accept:'form',
    input:z.object({
        email: z.string().email(),
        password: z.string().min(8),
        recordarme : z.boolean().optional(),

    }),
    handler: async({email, password,recordarme},{cookies})=>{

        if(recordarme){
            cookies.set('email', email,{
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), //1año
                path:'/', 
            });
        }else{
            cookies.delete('email',{
                path:'/'
            })
        }


        try {
            const user = await signInWithEmailAndPassword(firebase.auth, email, password);
            return user;
            
        } catch (error) {
            
            const firebaseError = error as AuthError;
            console.log(firebaseError)

            if(firebaseError.code === 'auth/invalid-credential'){
                throw new Error ('Email y/o contraseña no válidos')
            }

            throw new Error ('Algo salio mail')
        }
    }
});
