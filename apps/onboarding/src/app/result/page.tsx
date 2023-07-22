import { Metadata } from 'next';
import { ResultContents } from './components/ResultContents';
import { getLevelDetails } from './service';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export const dynamic = 'force-dynamic';
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const glasses = Number(searchParams?.glasses);
  const { name, description, image } = getLevelDetails(glasses);

  return {
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
