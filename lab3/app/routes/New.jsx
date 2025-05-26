import { useState } from "react";
import { useBooks } from "../Components/BooksContext";
import "../app.css";
import { useNavigate } from "react-router";

export function meta() {
  return [
    { title: "Książkarnia - Dodaj Książkę" },
    { name: "description", content: "Dodawanie nowej książki do sklepu" },
  ];
}

export default function NewBook() {
    const navigate = useNavigate();
  const { addBook } = useBooks();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("Fantasy");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() && author.trim()) {
      addBook({ title, author, category });
      setTitle("");
      setAuthor("");
      setCategory("Fantasy");
      alert("Dodano nową książkę!");
      navigate("/");
    } else {
      alert("Wypełnij wszystkie pola!");
    }
  };

  return (
    <main>
      <h1 className="center">Dodaj Nową Książkę</h1>
      <h2 className="center2">Uwaga - aby dodać nową książkę musisz być zalogowany.</h2>
      <form className="new-book-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tytuł książki"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Autor książki"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Fantasy</option>
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
          <option>Dramat</option>
        </select>
        <button type="submit">Dodaj książkę</button>
      </form>
    </main>
  );
}
