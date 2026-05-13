import { db } from '@/db';
import { bouquets } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { ReadOnlyCanvas } from '@/components/canvas/ReadOnlyCanvas';
import { ThemeMode, PlacedFlower } from '@/types';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BouquetPage({ params }: PageProps) {
  const { slug } = await params;

  const bouquet = await db.query.bouquets.findFirst({
    where: eq(bouquets.slug, slug),
  });

  if (!bouquet) {
    return (
      <main className="min-h-screen bg-[#FAFAFA] flex flex-col items-center justify-center p-8 text-center">
        <h1 className="text-4xl font-semibold text-[#111827] mb-4" style={{ fontFamily: 'var(--font-playfair)' }}>
          Bouquet Not Found
        </h1>
        <p className="text-[#6B7280]">We couldn&apos;t find the digital arrangement you were looking for.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <ReadOnlyCanvas 
        flowers={bouquet.flowers as PlacedFlower[]}
        baseLayer={bouquet.baseLayer}
        topLayer={bouquet.topLayer}
        themeMode={bouquet.themeMode as ThemeMode}
        hiddenMessage={bouquet.hiddenMessage}
      />
    </main>
  );
}
