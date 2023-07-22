import { Metadata, ResolvingMetadata } from 'next';
import { ResultContents } from './components/ResultContents';
import { getLevelDetails } from './service';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const glasses = Number(searchParams?.glasses);
  const { name, description, image } = getLevelDetails(glasses);

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: name,
    openGraph: {
      title: name,
      description,
      images:
        process.env.NODE_ENV === 'development'
          ? [image, ...previousImages]
          : [`${process.env.NEXT_PUBLIC_DOMAIN}${image}`, ...previousImages],
    },
  };
}

const ResultPage = () => {
  return <ResultContents />;
};

export default ResultPage;
