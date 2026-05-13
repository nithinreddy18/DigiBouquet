import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 relative">
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-2xl text-center space-y-8 animate-in fade-in duration-1000">

        {/* Visual Centerpiece */}
        <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto -mb-8 pointer-events-none drop-shadow-md">
          <Image
            src="/assets/peony.webp"
            alt="peony flower"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Headings */}
        <div className="space-y-3 z-10">
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-[#111827]" style={{ fontFamily: 'var(--font-playfair)' }}>
            digibouquet
          </h1>
          <p className="text-[#6B7280] font-normal text-lg md:text-xl tracking-wide">
            beautiful flowers delivered digitally
          </p>
        </div>

        {/* CTA Block */}
        <div className="flex flex-col items-center space-y-4 pt-6 w-full px-4">
          <Link
            href="/build"
            className="w-full md:w-auto min-h-[44px] flex items-center justify-center px-10 py-3.5 bg-[#111827] text-white rounded-full font-medium transition-all duration-200 ease-in-out hover:bg-gray-800 active:scale-95 shadow-sm"
          >
            BUILD A BOUQUET
          </Link>

          <Link
            href="/build?mode=bw"
            className="w-full md:w-auto min-h-[44px] flex items-center justify-center px-8 py-3.5 border border-[#111827] text-[#111827] bg-transparent rounded-full font-medium transition-colors duration-200 ease-in-out hover:bg-gray-100 active:scale-95 shadow-sm"
          >
            BUILD IT IN BLACK AND WHITE
          </Link>

          <Link
            href="/garden"
            className="group min-h-[44px] flex items-center justify-center text-[#6B7280] hover:text-[#111827] font-medium transition-colors duration-200 ease-in-out pt-2"
          >
            <span className="relative">
              VIEW GARDEN
              <span className="absolute left-0 bottom-0 w-full h-[1px] bg-[#111827] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out"></span>
            </span>
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full flex flex-row items-center justify-between p-4 md:px-8 mt-auto text-sm text-[#6B7280]">
        <div className="flex items-center space-x-2">
          <span>powered by</span>
          <svg aria-label="Vercel logomark" height="16" role="img" viewBox="0 0 74 64" width="16"><path d="M37.5896 0.25L74.5396 64.25H0.639648L37.5896 0.25Z" fill="currentColor"></path></svg>
          <span className="font-semibold text-[#111827]">vercel</span>
        </div>
        <div>
          <span>made by </span>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="font-medium text-[#111827] hover:underline">
            @pau_wee_
          </a>
        </div>
      </footer>
    </main>
  );
}
