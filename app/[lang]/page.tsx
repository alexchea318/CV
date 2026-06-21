export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return <main data-lang={lang}>FullStack AI Engineer</main>;
}
