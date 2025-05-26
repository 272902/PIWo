import { BooksProvider } from "./components/BooksContext"; 
export default function App() {
  return (
    <BooksProvider>
      <Outlet />
    </BooksProvider>
  );
}
