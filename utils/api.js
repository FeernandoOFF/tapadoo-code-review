// Tapadoo Documented API
// 'https://tpbookserver.herokuapp.com/books';

const TAPADOO_URL =
  'http://private-anon-8b5df47dc0-tpbookserver.apiary-mock.com/books';

// Google Isbn API
const GOOGLE_URL = 'https://www.googleapis.com/books/v1/volumes?q=isbn:';

let tapadooBooks;
export async function getBooks() {
  tapadooBooks = await fetch(TAPADOO_URL);
  tapadooBooks = await tapadooBooks.json();

  // Replace "-" with "" in ISBN and fetch google
  const requests = tapadooBooks.map((book) => {
    const isbn = book.isbn.replace(/-/g, '');
    return fetch(GOOGLE_URL + isbn);
  });

  // Call books from google in parallel

  const newBooks = await Promise.all(requests);

  const booksOfGoogle = await Promise.all(newBooks.map((b) => b.json()));

  const booksInfo = booksOfGoogle.map((book) => {
    // Filter out books that don't have info
    if (book.items) {
      const bookInfo = book.items[0].volumeInfo;
      if (!bookInfo.title) return;
      return bookInfo;
    }
  });

  return booksInfo;
}

export async function findOneBook({ title }) {
  const book = tapadooBooks.find((b) => title === b.title);
  return book;
}
