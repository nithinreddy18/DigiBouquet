import { db } from '@/db';
import { bouquets } from '@/db/schema';
import { desc } from 'drizzle-orm';
import { FLOWER_ASSETS, BUSH_ASSETS, GREENERY_ASSETS } from '@/lib/assets';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { PlacedFlower } from '@/types';

export const dynamic = 'force-dynamic';

export default async function GardenPage() {
  let recentBouquets: any[] = [];
  try {
    recentBouquets = await db.query.bouquets.findMany({
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
  } catch (error) {
    console.error('Failed to fetch bouquets:', error);
  }

  return (
    <main className="min-h-screen bg-[#FDFBF7] p-8 md:p-16 lg:p-24 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0 opacity-10">
        <Image src={FLOWER_ASSETS.Rose} alt="" width={300} height={300} className="absolute -top-20 -left-20 rotate-[-15deg] blur-[4px]" />
        <Image src={FLOWER_ASSETS.Sunflower} alt="" width={400} height={400} className="absolute -bottom-20 -right-20 rotate-[15deg] blur-[6px]" />
        <Image src={GREENERY_ASSETS['greenery-1']} alt="" width={500} height={500} className="absolute top-1/4 -right-40 rotate-[45deg] blur-[8px]" />
      </div>

      <header className="relative z-10 mb-20 text-center space-y-6">
        <h1 className="text-5xl md:text-7xl font-bold text-[#111827] tracking-tighter italic" style={{ fontFamily: 'var(--font-playfair)' }}>
          The Garden
        </h1>
        <p className="text-sm font-mono uppercase tracking-[0.3em] text-[#6B7280]">
          A community of organic digital arrangements
        </p>
      </header>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-4">
        {recentBouquets.map((bouquet) => (
          <Link 
            key={bouquet.slug} 
            href={`/bouquet/${bouquet.slug}`}
            className="group block"
          >
            <div className="relative aspect-square w-full bg-white/60 backdrop-blur-sm rounded-[2rem] shadow-xl border border-white/40 p-8 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[#FDFBF7]/50" />
              
              {/* Static Canvas Implementation for Gallery */}
              <div className="relative w-full h-full pointer-events-none">
                {/* Simplified preview for the gallery */}
                <div className="absolute inset-0 flex items-center justify-center opacity-80">
                   <div className="w-full h-full scale-75">
                      {/* We use a simplified version of the bouquet for the gallery card */}
                      <Image 
                        src={BUSH_ASSETS[bouquet.baseLayer]?.base || BUSH_ASSETS['bush-1'].base} 
                        alt="" fill className={cn("object-contain", bouquet.themeMode === 'mono' && "grayscale")} 
                      />
                      {(bouquet.flowers as PlacedFlower[]).slice(0, 8).map((flower, idx) => (
                        <div
                          key={idx}
                          className="absolute"
                          style={{ 
                            zIndex: flower.zIndex,
                            left: '50%',
                            top: '50%',
                            transform: `translate(-50%, -50%) translate(${flower.x * 0.4}px, ${flower.y * 0.4}px) rotate(${flower.rotation}deg) scale(${flower.scale * 0.4})`,
                          }}
                        >
                          <Image
                            src={FLOWER_ASSETS[flower.type as keyof typeof FLOWER_ASSETS]}
                            alt="" width={120} height={120} className={cn("object-contain", bouquet.themeMode === 'mono' && "grayscale")}
                          />
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex items-center justify-between px-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#A1A1AA]">
                {new Date(bouquet.createdAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
              <div className="h-[1px] flex-1 mx-4 bg-[#111827]/10" />
              <span className="text-xs italic font-serif text-[#111827]">View →</span>
            </div>
          </Link>
        ))}
      </div>

      <footer className="relative z-10 mt-32 text-center pb-16">
        <Link 
          href="/build" 
          className="group relative overflow-hidden bg-[#111827] text-white px-12 py-6 rounded-full font-serif text-xl italic transition-all duration-300 hover:pr-16 active:scale-95 shadow-2xl inline-block"
        >
          <span className="relative z-10">Add Your Arrangement</span>
          <span className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300">+</span>
        </Link>
      </footer>
    </main>
  );
}
