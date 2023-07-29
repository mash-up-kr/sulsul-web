import {
  useSuspenseQuery,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResultOnSuccess,
} from '@suspensive/react-query';
import { QueryKey } from '@tanstack/react-query';
import { ReactNode } from 'react';

export const SuspenseQuery = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(props: {
  options: UseSuspenseQueryOptions<TQueryFnData, TError, TData, TQueryKey>;
  children: (query: UseSuspenseQueryResultOnSuccess<TData>) => ReactNode;
}) => <>{props.children(useSuspenseQuery(props.options))}</>;
