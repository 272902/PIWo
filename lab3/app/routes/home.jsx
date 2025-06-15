import { use, useState, useContext } from "react";
import { useBooks } from "../Components/BooksContext";
import "../app.css";
import { auth } from "../config/firebase";
import BasketContext from "../Contexts/BasketReducerContext";

export function meta() {
  return [
    { title: "Książkarnia - Strona Główna" },
    { name: "description", content: "Lista książek i wyszukiwarka" },
  ];
}

export default function Home() {
  const { books, addBook, removeBook } = useBooks();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Wszystkie");
  const [onlyMine, setOnlyMine] = useState(false);

  const { dispatch } = useContext(BasketContext);

  const handleBasket = (book) => {
    dispatch({ type: "ADD_ITEM", payload: book });
  };

  const handleRemove = (book) => {
        dispatch({ type: "REMOVE_ITEM", payload: book });
    };

  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(search.toLowerCase()) || book.author.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "Wszystkie" || book.category === filter;
    const matchesUser = !onlyMine || book.userId === auth.currentUser?.uid;
    return matchesSearch && matchesFilter && matchesUser;
  });

  return (
    <main>
      <h1 className="center">
        Lista książek
      </h1>

      <form className="search-form">
        <input
          type="text"
          placeholder="Wyszukaj książkę..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>Przygodowa</option>
          <option>Społeczno-obyczajowa</option>
          <option>Poemat</option>
          <option>Romans</option>
          <option>Horror</option>
          <option>Thriller</option>
          <option>Biografia</option>
          <option>Historyczna</option>
          <option>Obyczajowa</option>
          <option>Sci-Fi</option>
          <option>Fantasy</option>
          <option>Dramat</option>
        </select>

        <button type="button" onClick={() => setOnlyMine(prev => !prev)}>
          {onlyMine ? "Wszystkie książki" : "Moje książki"}
        </button>
      </form>

      <section className="book-list">
        {filteredBooks.map((book) => (
          <article key={book.id} className="book-item">
            <div className="book-controls">
              <div className="book-info">
                <strong>{book.title}</strong>
                <small>{book.author}</small>
                <small>Kategoria: {book.category}</small>
              </div>
              <div className="book-buttons">
                <button>Edytuj</button>
                <button onClick={() => removeBook(book.id)}>Usuń</button>
                <button onClick={() => handleBasket(book)}>🧺</button>
              </div>
            </div>
          </article>
        ))}
        {filteredBooks.length === 0 && (
          <div className="center">
            <small>Brak książek spełniających kryteria.</small>
          </div>
        )}
      </section>
    </main>
  );
}
