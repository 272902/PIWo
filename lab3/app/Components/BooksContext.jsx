// Components/BooksContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { collection, addDoc, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db, auth } from "../config/firebase";

const BooksContext = createContext();

export function BooksProvider({ children }) {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "books"), (snapshot) => {
      const booksData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setBooks(booksData);
    });

    return unsubscribe;
  }, []);

  const addBook = async (book) => {
    if (!auth.currentUser) return;
    await addDoc(collection(db, "books"), {
      ...book,
      userId: auth.currentUser.uid
    });
  };

  const removeBook = async (id) => {
    await deleteDoc(doc(db, "books", id));
  };

  return (
    <BooksContext.Provider value={{ books, addBook, removeBook }}>
      {children}
    </BooksContext.Provider>
  );
}

export function useBooks() {
  return useContext(BooksContext);
}
