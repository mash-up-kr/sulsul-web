'use client';
import { useQuery } from '@tanstack/react-query';
import { 주종컨트롤러Api, DrinkResDrinkTypeEnum } from '~/api';

const 주종컨트롤러api = new 주종컨트롤러Api();

export default function Page() {
  const query = useQuery({
    queryKey: ['openapi'] as const,
    queryFn: () => 주종컨트롤러api.drink(),
  });

  return (
    <>
      {JSON.stringify(query.data)} {DrinkResDrinkTypeEnum.고량주}
    </>
  );
}
