import { SmoothScroll } from "@/components/fx/SmoothScroll";

export default async function Page({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return (
    <main data-lang={lang}>
      <SmoothScroll>
        FullStack AI Engineer
      </SmoothScroll>
    </main>
  );
}
