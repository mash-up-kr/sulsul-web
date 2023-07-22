import { Metadata } from 'next';
import { ResultContents } from './components/ResultContents';
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
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_DOMAIN || 'https://onboarding.sulsul.app'
    ),
    title: name,
    openGraph: {
      title: name,
      description,
      images: image,
    },
  };
}

export default function ResultPage() {
  return <ResultContents />;
}
