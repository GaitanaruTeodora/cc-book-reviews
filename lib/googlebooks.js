const cache = {};

export async function getBookData(isbn) {
  if (isbn in cache) {
    return cache[isbn];
  }

  const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${process.env.GOOGLE_BOOKS_API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();

  if (data.totalItems === 0) {
    throw new Error("No book found with the provided ISBN.");
  }

  const book = data.items[0];
  const bookData = {
    thumbnail: book.volumeInfo.imageLinks?.thumbnail,
    description: book.volumeInfo.description,
    categories: book.volumeInfo.categories,
    publisher: book.volumeInfo.publisher,
    publishedDate: book.volumeInfo.publishedDate,
    pageCount: book.volumeInfo.pageCount,
    previewLink: book.volumeInfo.previewLink,
  };

  cache[isbn] = bookData;

  return bookData;
}



