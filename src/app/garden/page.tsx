import { db } from '@/db';
import { bouquets } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { FLOWER_ASSETS, BUSH_ASSETS } from '@/lib/assets';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { PlacedFlower } from '@/types';

export default async function GardenPage() {
  const recentBouquets = await db.query.bouquets.findMany({
    orderBy: [desc(bouquets.createdAt)],
    limit: 50,
    columns: {
      id: true,
      slug: true,
      themeMode: true,
      baseLayer: true,
      topLayer: true,
      flowers: true,
      createdAt: true,
    }
  });

  return (
    <main className="min-h-screen bg-[#FAFAFA] p-8 md:p-16 lg:p-24 relative">
      <header className="mb-16 text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-semibold text-[#111827] tracking-tight" style={{ fontFamily: 'var(--font-playfair)' }}>
          The Garden
        </h1>
        <p className="text-lg text-[#6B7280]">
          A collection of digital arrangements
        </p>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recentBouquets.map((bouquet) => (
          <Link 
            key={bouquet.slug} 
            href={`/${bouquet.slug}`}
            className="group block"
          >
            <div className="relative aspect-square w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              {/* Static Canvas Implementation for Gallery */}
              <div className="relative w-full h-full pointer-events-none overflow-hidden">
                <Image 
                  src={BUSH_ASSETS[bouquet.baseLayer]?.base || BUSH_ASSETS['bush-1'].base} 
                  alt="Bush base" 
                  fill 
                  className={cn(
                    "object-contain",
                    bouquet.themeMode === 'mono' && "grayscale contrast-[1.2]"
                  )}
                  loading="lazy"
                />
                
                {(bouquet.flowers as PlacedFlower[]).map((flower, idx) => (
                  <div
                    key={idx}
                    className="absolute"
                    style={{ 
                      zIndex: flower.zIndex,
                      left: '50%',
                      top: '50%',
                      transform: `translate(-50%, -50%) translate(${flower.x * 0.5}px, ${flower.y * 0.5}px) rotate(${flower.rotation}deg) scale(${flower.scale * 0.4})`,
                    }}
                  >
                    <Image
                      src={FLOWER_ASSETS[flower.type as keyof typeof FLOWER_ASSETS]}
                      alt={flower.type}
                      width={100}
                      height={100}
                      className={cn(
                        "object-contain",
                        bouquet.themeMode === 'mono' && "grayscale contrast-[1.2]"
                      )}
                    />
                  </div>
                ))}

                <Image 
                  src={BUSH_ASSETS[bouquet.baseLayer]?.top || BUSH_ASSETS['bush-1'].top} 
                  alt="Bush top" 
                  fill 
                  className={cn(
                    "object-contain z-[100]",
                    bouquet.themeMode === 'mono' && "grayscale contrast-[1.2]"
                  )}
                />
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <span className="text-sm font-medium text-[#6B7280] group-hover:text-[#111827] transition-colors">
                {new Date(bouquet.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </span>
            </div>
          </Link>
        ))}
      </div>

      <footer className="mt-24 text-center pb-8">
        <Link 
          href="/build" 
          className="group inline-flex items-center justify-center text-[#6B7280] hover:text-[#111827] font-medium transition-colors duration-200"
        >
          <span className="relative">
            Create your own +
            <span className="absolute left-0 bottom-0 w-full h-[1px] bg-[#111827] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out"></span>
          </span>
        </Link>
      </footer>
    </main>
  );
}
