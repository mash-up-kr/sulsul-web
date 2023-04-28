import { css, useTheme } from '@emotion/react';
import { Button } from '@sulsul/ui';
import { motion } from 'framer-motion';
import { Box, flex, gutter } from '@jsxcss/emotion';
import { Delay, Suspense } from '@suspensive/react';
import { useSuspenseQuery } from '@suspensive/react-query';
import axios from 'axios';

const Web = () => (
  <Suspense.CSROnly fallback={<Delay ms={4000}>hi</Delay>}>
    <LoadingComponent />
  </Suspense.CSROnly>
);

export default Web;

const LoadingComponent = () => {
  const theme = useTheme();
  const query = useSuspenseQuery({
    queryKey: [],
    queryFn: async () => {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve('hi');
        }, 3000);
      });

      return axios.get<{ userId: string }>('https://jsonplaceholder.typicode.com/posts/1').then(({ data }) => data);
    },
  });

  return (
    <>
      {query.data.userId}
      <Box
        as={motion.div}
        whileTap={{ scale: 1.2 }}
        css={css`
          background-color: ${theme.colors.black};
          ${flex({ direction: 'column' })}
          ${gutter({ direction: 'vertical', spacing: 24 })}
        `}
      >
        <Button />
        <Button />
        <Button />
        <Button />
        <Button />
      </Box>
      <Box
        as={motion.div}
        whileTap={{ scale: 1.2 }}
        css={css`
          background-color: ${theme.colors.black};
          ${flex({ direction: 'column' })}
          ${gutter({ direction: 'vertical', spacing: 24 })}
        `}
      >
        <Button />
        <Button />
        <Button />
        <Button />
        <Button />
      </Box>
    </>
  );
};
