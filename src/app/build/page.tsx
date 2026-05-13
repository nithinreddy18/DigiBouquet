import React, { Suspense } from 'react';
import { BuilderClient } from './BuilderClient';

export default function BouquetBuilderPage(props: { searchParams: Promise<{ mode?: string }> }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">Loading...</div>}>
      <BuilderWrapper searchParams={props.searchParams} />
    </Suspense>
  );
}

async function BuilderWrapper({ searchParams }: { searchParams: Promise<{ mode?: string }> }) {
  const params = await searchParams;
  return <BuilderClient initialMode={params.mode === 'bw' ? 'mono' : 'color'} />;
}
