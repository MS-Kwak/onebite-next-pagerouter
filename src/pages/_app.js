import '@/styles/globals.css';
import GlobalLayout from '@/components/global-layout';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
  // const router = useRouter();
  // console.log('App router:', router);

  // const onClickButton = () => {
  //   console.log('버튼 클릭');
  //   // 페이지 이동
  //   router.push('/test');
  // };

  // // npm run build 후에 npm run start로 실행하면 프리패칭이 되지 않는 경우
  // useEffect(() => {
  //   // 페이지 이동 시 프리패칭을 활성화
  //   router.prefetch('/test');
  // }, []);

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      {/* <header>
        <Link href="/">index</Link>
        {/* 프리패칭을 굳이 안해도 되는 페이지는 아래와 같이...
        <Link href="/search" prefetch={false}>
          search
        </Link>
        <Link href="/book/1">book/1</Link>
        <div>
          <button onClick={onClickButton}>/test</button>
        </div>
      </header> */}
      <GlobalLayout>{getLayout(<Component {...pageProps} />)}</GlobalLayout>
    </>
  );
}
