import { auth, googleProvider } from "../config/firebase"; 
import { createUserWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";

export const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);


    const signIn = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) { console.error(err) }
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) { console.error(err) }
    };

    const logOut = async () => {
        try {
            await signOut(auth);
        } catch (err) { console.error(err) }
    };
   

  return (
    <div>
        {user ? (
            <p style={{ color: "green" }}>Użytkownik zalogowany: {user.email}</p>
        ) : (
            <p style={{ color: "red" }}>Niezalogowany</p>
        )}

        <input placeholder="Email" 
                onChange={(e) => setEmail(e.target.value)}/>
        <input placeholder="Hasło" 
                onChange={(e) => setPassword(e.target.value)}/>

        <button type="button" onClick={signIn}>Zaloguj</button>
        <button onClick={signInWithGoogle}>Zaloguj z Google</button>
        <button onClick={logOut}>Wyloguj się</button>
    </div>
  );
};
