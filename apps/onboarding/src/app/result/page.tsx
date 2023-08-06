import { Suspense } from '@suspensive/react';
import axios from 'axios';
import { Metadata } from 'next';
import { TitleDto } from '~/api';
import { ResultContents } from './components/ResultContents';
import { ResultFallback } from './components/ResultFallback';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export const dynamic = 'force-dynamic';

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const drinkType = searchParams?.drinkType;
  const glasses = Number(searchParams?.glasses);

  const resultQuery = await axios
    .get<{ title: TitleDto }>(
      `https://sulsul.app/api/v1/drinkingLimit?drinkType=${drinkType}&glass=${glasses}`
    )
    .then((response) => response.data);

  const metadata = resultQuery.title;

  return {
    title: `당신은 ${metadata.title} 🍻`,
    openGraph: {
      title: metadata.title,
      description: metadata.subTitle,
      images: metadata.cardImageUrl,
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
