import { Suspense } from '@suspensive/react';
import { Metadata } from 'next';
import { ResultContents } from './components/ResultContents';
import { ResultFallback } from './components/ResultFallback';
import { getLevelDetails } from './service';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export const runtime = 'edge';
export const dynamic = 'force-dynamic';

export function generateMetadata({ searchParams }: Props): Metadata {
  const glasses = Number(searchParams?.glasses);
  const { name, description, image } = getLevelDetails(glasses);

  return {
    title: `당신은 ${name} 🍻`,
    openGraph: {
      title: name,
      description,
      images: image,
    },
  };
}

export default function ResultPage() {
  return (
    <Suspense fallback={<ResultFallback />}>
      <ResultContents />
    </Suspense>
  );
}
