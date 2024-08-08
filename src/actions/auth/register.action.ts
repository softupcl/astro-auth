import { ZodString, z } from "astro/zod";
import { defineAction } from "astro:actions";
import { createUserWithEmailAndPassword, type AuthError, updateProfile, sendEmailVerification } from "firebase/auth";
import { firebase } from "../../firebase/config";

export const registerUser = defineAction({
    accept:'form',
    input: z.object({
        nombre : z.string().min(2),
        email: z.string().email(),
        password : z.string().min(8),
        recordarme : z.boolean().optional(),

    }),
    handler: async({ nombre, email, password, recordarme },{cookies})=>{
        
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


        //Creacion usuario 
        try {

            const user = await createUserWithEmailAndPassword(firebase.auth, email, password);

            updateProfile(firebase.auth.currentUser!,{
                displayName : nombre
            });

            await sendEmailVerification(firebase.auth.currentUser!,{
                //url:'http://localhost:4321/privado?emailVerficado=true'
                url:`${import.meta.env.WEBSITE_URL}/privado?emailVerficado=true`
            })

            return user;
            
        } catch (error) {
            const firebaseError = error as AuthError;

            if(firebaseError.code === 'auth/email-already-in-use'){
                throw new Error ('El correo ya esta en uso')
            }

            throw new Error ('Algo salio mail')
        }

        return {ok: true, message: 'Usuario creado'};
    }
})