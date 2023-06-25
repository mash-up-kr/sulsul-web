import {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';

export function assert(
  condition: unknown,
  error: Error | string = new Error()
): asserts condition {
  if (!condition) {
    if (typeof error === 'string') {
      throw new Error(error);
    } else {
      throw error;
    }
  }
}

type NonEmptyArray<T> = [T, ...T[]];

type InferChangedStepName<T extends Readonly<NonEmptyArray<string>>> = {
  [K in keyof T]: {
    prev: T[K];
    next: Exclude<T[number], T[K]>;
  };
}[number];

type UseStepOptions<TStepNames extends Readonly<NonEmptyArray<string>>> = {
  initialName?: TStepNames[number];
  onChange?: (
    stepName: {
      [K in keyof TStepNames]: {
        prev: TStepNames[K];
        next: Exclude<TStepNames[number], TStepNames[K]>;
      };
    }[number]
  ) => void;
};
type StepState<TName extends string> = {
  name: TName;
  index: number;
  to: (name: TName) => void;
  hasNext: boolean;
  toNext: () => void;
  hasPrev: boolean;
  toPrev: () => void;
  reset: () => void;
};

const StepStateContext = createContext<StepState<string> | undefined>(undefined);

export const useStepStateContext = <
  TStepNames extends Readonly<NonEmptyArray<string>>
>() => {
  const stepStateContext = useContext(StepStateContext);

  if (stepStateContext === undefined) {
    throw new Error(`[useStepStateContext]: Step Component is required in parent`);
  }

  return stepStateContext as StepState<TStepNames[number]>;
};

type StepComponent<TName> = FunctionComponent<PropsWithChildren<{ name: TName }>>;

const hasDuplicates = <T extends Readonly<NonEmptyArray<unknown>>>(arr: T) =>
  new Set(arr).size !== arr.length;

export const useStep = <TStepNames extends Readonly<NonEmptyArray<string>>>(
  stepNames: TStepNames,
  { initialName = stepNames[0], onChange }: UseStepOptions<TStepNames> = {}
): [StepComponent<TStepNames[number]>, StepState<TStepNames[number]>] => {
  if (process.env.NODE_ENV === 'development') {
    assert(
      !hasDuplicates(stepNames),
      'useStep: Parameter stepNames must be a string array with no duplicate elements'
    );
    assert(
      stepNames.length > 0,
      'useStep: Parameter stepNames must have at least one element'
    );
  }

  const [currentName, setCurrentName] = useState<TStepNames[number]>(initialName);
  const { current: steps } = useRef(stepNames.map((name, index) => ({ name, index })));

  const stepState = useMemo(() => {
    const currentStep = steps.find((step) => step.name === currentName) ?? {
      name: initialName,
      index: steps.findIndex((step) => step.name === initialName),
    };

    const nextIndex = currentStep.index + 1;
    const hasNext = steps.length > nextIndex;
    const prevIndex = currentStep.index - 1;
    const hasPrev = prevIndex >= 0;

    const stepState = {
      name: currentStep.name,
      index: currentStep.index,
      to: (stepName: TStepNames[number]) => {
        if (stepName !== currentStep.name) {
          setCurrentName(stepName);
          onChange?.({
            prev: currentName,
            next: stepName,
          } as InferChangedStepName<TStepNames>);
        }
      },
      hasNext,
      toNext: () => {
        if (hasNext) {
          setCurrentName(steps[nextIndex].name);
          onChange?.({
            prev: currentStep.name,
            next: steps[nextIndex].name,
          } as InferChangedStepName<TStepNames>);
        }
      },
      hasPrev,
      toPrev: () => {
        if (hasPrev) {
          setCurrentName(steps[prevIndex].name);
          onChange?.({
            prev: currentStep.name,
            next: steps[nextIndex].name,
          } as InferChangedStepName<TStepNames>);
        }
      },
      reset: () => setCurrentName(initialName),
    };

    return stepState;
  }, [currentName, initialName, steps, onChange]);

  const Step = useCallback<StepComponent<TStepNames[number]>>(
    (props) => (
      <StepStateContext.Provider value={stepState}>
        <>{stepState.name === props.name ? props.children : null}</>
      </StepStateContext.Provider>
    ),
    [stepState]
  );

  return [Step, stepState];
};
