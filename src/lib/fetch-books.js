export default async function fetchBooks(q) {
  let url = 'https://onebite-books-server-six-chi.vercel.app/book'; // Replace with your actual API endpoint

  if (q) {
    url += `/search?q=${q}`;
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching books:', error);
    return []; // Return an empty array in case of error
  }
}
