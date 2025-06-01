import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import style from './searchable-layout.module.css';

export default function SearchableLayout({ children }) {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const q = router.query.q;

  useEffect(() => {
    setSearch(q || '');
  }, [q]);

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const onSubmit = () => {
    if (!search || q === search) return;
    router.push(`/search?q=${search}`);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div>
      <div className={style.searchbar_container}>
        <input
          onChange={onChangeSearch}
          onKeyDown={onKeyDown}
          value={search}
          placeholder="검색어를 입력하세요"
        />
        <button onClick={onSubmit}>검색</button>
      </div>
      {children}
    </div>
  );
}
