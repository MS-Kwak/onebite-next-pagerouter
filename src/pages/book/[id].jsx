import fetchOneBook from '@/lib/fetch-one-book';
import style from './[id].module.css';
import { useRouter } from 'next/router';
import Head from 'next/head';

// const mockData = {
//   id: 1,
//   title: '한 입 크기로 잘라 먹는 리액트',
//   subTitle: '자바스크립트 기초부터 애플리케이션 배포까지',
//   description:
//     '자바스크립트 기초부터 애플리케이션 배포까지\n처음 시작하기 딱 좋은 리액트 입문서\n\n이 책은 웹 개발에서 가장 많이 사용하는 프레임워크인 리액트 사용 방법을 소개합니다. 인프런, 유데미에서 5000여 명이 수강한 베스트 강좌를 책으로 엮었습니다. 프런트엔드 개발을 희망하는 사람들을 위해 리액트의 기본을 익히고 다양한 앱을 구현하는 데 부족함이 없도록 만들었습니다. \n\n자바스크립트 기초 지식이 부족해 리액트 공부를 망설이는 분, 프런트엔드 개발을 희망하는 취준생으로 리액트가 처음인 분, 퍼블리셔나 백엔드에서 프런트엔드로 직군 전환을 꾀하거나 업무상 리액트가 필요한 분, 뷰, 스벨트 등 다른 프레임워크를 쓰고 있는데, 실용적인 리액트를 배우고 싶은 분, 신입 개발자이지만 자바스크립트나 리액트 기초가 부족한 분에게 유용할 것입니다.',
//   author: '이정환',
//   publisher: '프로그래밍인사이트',
//   coverImgUrl:
//     'https://shopping-phinf.pstatic.net/main_3888828/38888282618.20230913071643.jpg',
// };

// SSG (Static Site Generation) 방식으로 페이지를 미리 생성합니다.
export const getStaticPaths = async () => {
  // 실제로는 API를 통해서 동적으로 생성하는 것이 좋습니다.
  // 예시로, 아래와 같이 mockData를 사용합니다.
  return {
    paths: [
      { params: { id: '1' } },
      { params: { id: '2' } },
      { params: { id: '3' } },
      { params: { id: '4' } },
      { params: { id: '5' } },
    ],
    // false: 404 notefound
    // true: SSR + 존재하지 않는 경로는 404 페이지를 반환합니다.
    // blocking으로 설정하면, 페이지를 요청할 때마다 서버에서 데이터를 가져와서 페이지를 생성합니다. SSG와 SSR의 혼합 형태입니다.
    fallback: true, // true, false, blocking 중 하나를 선택할 수 있습니다.
  };
};

// 컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터를 불러오는 함수.
// export const getServerSideProps = async (context) => {
// SSG (Static Site Generation) 방식으로 페이지를 미리 생성합니다.
export const getStaticProps = async (context) => {
  // console.log('getServerSideProps context:', context);

  const { id } = context.params;
  // console.log('getServerSideProps id:', id);
  const book = await fetchOneBook(Number(id));

  if (!book) {
    // 만약 book이 없다면, 404 페이지를 반환합니다.
    return {
      notFound: true,
    };
  }

  return {
    props: {
      book,
    },
  };
};

export default function Paage({ book }) {
  const router = useRouter();
  if (router.isFallback) {
    // fallback이 true로 설정되어 있을 때, 페이지가 로딩 중임을 표시합니다.
    return (
      <>
        <Head>
          <title>한입북스</title>
          <meta property="og:title" content="한입북스" />
          <meta
            property="og:description"
            content="한입북스에 등록된 도서들을 만나보세요"
          />
          <meta property="og:image" content="/thumbnail.png" />
        </Head>
        <div className={style.container}>책 정보를 불러오는 중입니다...</div>
      </>
    );
  }
  if (!book) {
    return (
      <div className={style.container}>
        책 정보를 불러오는데 문제가 발생했습니다. 다시 시도해 주세요...
      </div>
    );
  }

  const { id, title, subTitle, description, author, publisher, coverImgUrl } = book;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={coverImgUrl} />
      </Head>
      <div className={style.container}>
        <div
          className={style.cover_img_container}
          style={{ backgroundImage: `url('${coverImgUrl}')` }}
        >
          <img src={coverImgUrl} />
        </div>
        <div className={style.title}>{title}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <div className={style.author}>
          {author} | {publisher}
        </div>
        <div className={style.description}>{description}</div>
      </div>
    </>
  );
}
