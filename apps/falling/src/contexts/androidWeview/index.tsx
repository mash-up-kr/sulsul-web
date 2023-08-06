import {
  createContext,
  PropsWithChildren,
  ReactNode,
  Suspense,
  useContext,
  useEffect,
  useState,
} from 'react';

const AndroidWebviewContext = createContext<AndroidWebview | null>(null);
export const AndroidWebviewProvider = (props: PropsWithChildren) => {
  const [androidWebview, setAndroidWebview] = useState<AndroidWebview | null>(null);
  useEffect(() => {
    if ((window as any).android) {
      setAndroidWebview((window as any).android);
    }
  }, []);
  return <AndroidWebviewContext.Provider {...props} value={androidWebview} />;
};

export const AndroidWebviewGuaranteed = ({
  render,
  fallback,
}: {
  render: (androidWebview: AndroidWebview) => ReactNode;
  fallback?: ReactNode;
}) => {
  const androidWebviewContextValue = useContext(AndroidWebviewContext);

  if (androidWebviewContextValue === null) {
    return <>{fallback}</>;
  }
  const androidWebview = androidWebviewContextValue;
  return <>{render(androidWebview)}</>;
};

interface AndroidWebview {
  showToastMessage(): void;
}

export const useAndroidWebview = (): AndroidWebview => {
  const androidWebviewContextValue = useContext(AndroidWebviewContext);

  if (androidWebviewContextValue === null) {
    throw new Promise(() => {});
  }

  return androidWebviewContextValue;
};

export const Comp = () => {
  return (
    <>
      hihihih jijojooj
      <Suspense fallback={<>loading...</>}>
        <AndroidWebviewUser />
      </Suspense>
      <AndroidWebviewGuaranteed
        render={(webview) => <button onClick={webview.showToastMessage}>hi</button>}
      />
    </>
  );
};

const AndroidWebviewUser = () => {
  const androidWebview = useAndroidWebview();

  const handleClick = () => androidWebview.showToastMessage();

  return <button onClick={handleClick}></button>;
};
