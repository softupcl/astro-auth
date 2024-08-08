import { defineAction } from "astro:actions";
import { GoogleAuthProvider, signInWithCredential, signOut } from "firebase/auth";
import { firebase } from "../../firebase/config";
import { z } from "astro/zod";

export const loginGoogle = defineAction({
    accept:'json',
    input: z.any(),
    handler: async(credentials)=>{
       const credential = GoogleAuthProvider.credentialFromResult(credentials);
        if(!credential){
            throw new Error("Login con google ha fallado ");
        }

       await signInWithCredential(firebase.auth, credential);
       return {ok:true}
    }
});
