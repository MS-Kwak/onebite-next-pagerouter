import SearchableLayout from '@/components/searchable-layout';
import style from './index.module.css';
import BookItem from '../components/book-item';
import fatchBooks from '@/lib/fetch-books'; // 데이터 불러오는 함수
import fatchRandomBooks from '@/lib/fetch-random-books'; // 추천 도서 불러오는 함수
import Head from 'next/head';

// 컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터를 불러오는 함수.
// export const getServerSideProps = async () => {
// SSG (Static Site Generation) 방식으로 페이지를 미리 생성합니다.
export const getStaticProps = async () => {
  const [allBooks, recoBooks] = await Promise.all([fatchBooks(), fatchRandomBooks()]);

  return {
    props: {
      allBooks,
      recoBooks,
    },
    revalidate: 3, // 3초마다 페이지를 재생성합니다. reavalidate: 재검증하다.
    // ISR (Incremental Static Regeneration) 방식으로 페이지를 재생성합니다.
    // ISR 방식으로 사용하는걸 추천합니다!! 가장 강력함!!
  };
};

export default function Home({ allBooks, recoBooks }) {
  // console.log('allBooks:', allBooks);

  return (
    <>
      <Head>
        <title>한입북스</title>
        <meta property="og:title" content="한입북스" />
        <meta property="og:description" content="한입북스에 등록된 도서들을 만나보세요" />
        <meta property="og:image" content="/thumbnail.png" />
      </Head>
      <div className={style.container}>
        <section>
          <h3>지금 추천하는 도서</h3>
          {recoBooks.map((book) => (
            <BookItem key={book.id} {...book} />
          ))}
        </section>
        <section>
          <h3>등록된 모든 도서</h3>
          {allBooks.map((book) => (
            <BookItem key={book.id} {...book} />
          ))}
        </section>
      </div>
    </>
  );
}

Home.getLayout = (page) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
