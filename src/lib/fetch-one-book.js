export default async function fetchOneBook(id) {
  const url = `https://onebite-books-server-six-chi.vercel.app/book/${id}`; // Replace with your actual API endpoint

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching random books:', error);
    return null; // Return null in case of error
  }
}
