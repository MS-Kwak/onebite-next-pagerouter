import { useRouter } from 'next/router';

export default function Paage() {
  const router = useRouter();
  const { id } = router.query;

  console.log('Book ID:', id);
  return (
    <div>
      <h1>Book Page: {id}</h1>
      <p>This is the book page.</p>
    </div>
  );
}
