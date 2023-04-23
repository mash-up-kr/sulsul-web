import { css, useTheme } from '@emotion/react';
import { Button } from '@sulsul/ui';
import { motion } from 'framer-motion';
import { flex, gutter } from '@jsxcss/emotion';
import { Delay, Suspense } from '@suspensive/react';
import { useSuspenseQuery } from '@suspensive/react-query';

const Web = () => (
  <Suspense.CSROnly fallback={<Delay ms={4000}>hi</Delay>}>
    <LoadingComponent />
  </Suspense.CSROnly>
);

export default Web;

const LoadingComponent = () => {
  const theme = useTheme();
  const query = useSuspenseQuery<{ userId: string }>([], async () => {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve('hi');
      }, 3000);
    });

    return fetch('https://jsonplaceholder.typicode.com/posts/1').then((response) => response.json());
  });

  return (
    <>
      {query.data.userId}
      <motion.div
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
      </motion.div>
    </>
  );
};
