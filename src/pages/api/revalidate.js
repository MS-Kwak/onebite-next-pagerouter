export default async function handler(req, res) {
  try {
    // Next.js의 revalidate 기능을 사용하여 페이지를 재생성합니다.
    // revalidate는 ISR (Incremental Static Regeneration) 기능을 사용합니다.
    await res.revalidate('/'); // 홈 페이지를 재생성합니다.

    return res.json({ revalidated: true });
  } catch (err) {
    console.error('Revalidation error:', err);
    return res.status(500).send('Revalidation failed');
  }
}
