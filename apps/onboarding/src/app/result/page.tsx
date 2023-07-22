import { Metadata } from 'next';
import { ResultContents } from './components/ResultContents';
import { getLevelDetails } from './service';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export const dynamic = 'force-dynamic';
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const glasses = Number(searchParams?.glasses);
  const levelDetails = getLevelDetails(glasses);

  return {
    title: levelDetails.name,
    openGraph: {
      title: levelDetails.name,
      description: levelDetails.description,
      images:
        process.env.NODE_ENV === 'development'
          ? levelDetails.image
          : `${process.env.NEXT_PUBLIC_DOMAIN}${levelDetails.image}`,
    },
  };
}

export default function ResultPage() {
  return <ResultContents />;
}
