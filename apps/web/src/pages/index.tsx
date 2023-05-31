import { useTheme } from '@emotion/react';
import { Box, Flex, Stack } from '@jsxcss/emotion';
import { Delay, Suspense } from '@suspensive/react';
import { useSuspenseQuery } from '@suspensive/react-query';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { ComponentPropsWithoutRef, forwardRef, PropsWithChildren } from 'react';
import { useToggle, useWindowSize } from '~/hooks/test';

const Web = () => (
  <Suspense.CSROnly
    fallback={
      <Box>
        1000 delay 시작 Amplify new commit test labeler workflow test
        <Delay ms={1000}>
          <Spinner />
        </Delay>
      </Box>
    }
  >
    <LoadingComponent />
  </Suspense.CSROnly>
);

export default Web;

const LoadingComponent = () => {
  const windowSize = useWindowSize();

  const [isLoading, toggleIsLoading] = useToggle(true);
  const theme = useTheme();
  const query = useSuspenseQuery({
    queryKey: [],
    queryFn: async () => {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve('hi');
        }, 2000);
      });

      return axios
        .get<{ userId: string }>('https://jsonplaceholder.typicode.com/posts/1')
        .then(({ data }) => data);
    },
  });

  return (
    <Stack.Vertical
      padding={12}
      backgroundColor="#fafafa"
      border="1px solid lightgray"
      borderRadius={16}
    >
      <Flex
        as="section"
        padding={16}
        paddingRight={0}
        backgroundColor="lighgray"
        borderRadius={12}
      >
        받아온 userId: {query.data.userId}, windowSize: ({windowSize.width},{' '}
        {windowSize.height})
      </Flex>
      <Stack.Vertical
        padding={12}
        backgroundColor={theme.colors.black}
        border="1px solid lightgray"
        borderRadius={16}
      >
        <Button>버튼을 누르세요</Button>
        <Button>버튼을 누르세요</Button>
        <Button loading={isLoading} onClick={() => toggleIsLoading()}>
          버튼을 누르세요
        </Button>
      </Stack.Vertical>
    </Stack.Vertical>
  );
};

const Button = forwardRef<
  HTMLButtonElement,
  PropsWithChildren<
    Pick<ComponentPropsWithoutRef<'button'>, 'onClick'> & {
      loading?: boolean;
    }
  >
>(({ children, loading = false, ...rest }, ref) => (
  <Stack.Horizontal
    as={motion.button}
    ref={ref}
    whileTap={{ scale: 0.92, backgroundColor: 'rgb(46, 0, 90)' }}
    whileHover={{ scale: 0.98, opacity: 0.86 }}
    padding="16px 50px"
    backgroundColor="blueviolet"
    borderRadius={12}
    borderStyle="none"
    cursor="pointer"
    position="relative"
    {...rest}
  >
    <Flex.Center position="absolute" top={0} left={20} bottom={0}>
      <AnimatePresence>{loading && <Spinner />}</AnimatePresence>
    </Flex.Center>
    <Flex.Center color="white" flex={1} fontSize={16}>
      {children}
    </Flex.Center>
  </Stack.Horizontal>
));

const Spinner = () => (
  <Box
    as={motion.div}
    initial={{ x: -20, scale: 0 }}
    animate={{ x: 0, scale: 1 }}
    exit={{ x: -20, scale: 0 }}
  >
    <Box
      as={motion.div}
      animate={{
        scale: [1, 1.2, 1, 1.2, 1],
        rotate: [0, 180, 360],
        transition: { repeat: Infinity, duration: 1, ease: 'linear' },
      }}
      exit={{ scale: 0 }}
      width={12}
      height={12}
      border="1px solid white"
      borderRadius="50%"
      borderTop="none"
      borderRight="none"
      margin="8px auto"
    />
  </Box>
);
