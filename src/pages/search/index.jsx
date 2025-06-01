import SearchableLayout from '@/components/searchable-layout';
import { useState, useEffect } from 'react';
// import books from '@/mock/books.json';
import BookItem from '@/components/book-item';
import fatchBooks from '@/lib/fetch-books';
import { useRouter } from 'next/router';
import Head from 'next/head';

// // 서버 사이드 렌더링을 통해서 데이터를 가져오고, 그 데이터를 컴포넌트에 전달합니다.
// export const getServerSideProps = async (context) => {
// // SSG (Static Site Generation) 방식으로 페이지를 미리 생성합니다.
// // search 페이지는 검색어에 따라 결과가 달라지므로, getStaticProps를 사용할 수 없습니다.!!
//   console.log('getServerSideProps context:', context);

//   const q = context.query.q || ''; // 쿼리 파라미터에서 검색어를 가져옵니다.
//   // console.log('Search query:', q);
//   const books = await fatchBooks(q);

//   return {
//     props: { books }, // 현재는 props가 필요 없지만, 나중에 필요할 수 있습니다.
//   };
// };

// export default function Page({ books }) {
export default function Page() {
  // SSG방식 사용.
  const [books, setBooks] = useState([]);

  const router = useRouter();
  const { q } = router.query; // 쿼리 파라미터에서 검색어를 가져옵니다.
  const fetchSearchResult = async () => {
    const data = await fatchBooks(q);
    setBooks(data);
  };
  console.log('Search query:', q);
  useEffect(() => {
    if (q) {
      // 쿼리 파라미터가 있을 때만 검색 결과를 가져옵니다.
      fetchSearchResult();
    }
  }, [q]); // q가 변경될 때마다 검색 결과를 가져옵니다.

  return (
    <>
      <Head>
        <title>한입북스 - 검색결과</title>
        <meta property="og:title" content="한입북스 - 검색결과" />
        <meta
          property="og:description"
          content={`"${q}"에 대한 검색 결과를 확인하세요.`}
        />
        <meta property="og:image" content="/thumbnail.png" />
      </Head>
      <div className="search">
        {books.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </div>
    </>
  );
}

Page.getLayout = (page) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
