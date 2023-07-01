'use client';

import { DevTool } from '@hookform/devtools';
import { Flex, Stack } from '@jsxcss/emotion';
import { Button } from '@sulsul/ui';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { useStep, useStepStateContext } from 'react-hook-step';

type FieldValues = {
  field1: string;
  field2: string;
  field3: string;
};

const stepNames = ['field1', 'field2', 'field3'] as const;

export default function Page() {
  const [Step, stepState] = useStep(stepNames);
  const form = useForm<FieldValues>({
    defaultValues: {},
    shouldUnregister: false,
  });

  return (
    <FormProvider {...form}>
      <Stack
        as="form"
        onSubmit={form.handleSubmit((formData) => {
          alert(JSON.stringify(formData));
        })}
      >
        <Flex.Center>Step Title</Flex.Center>
        {stepState.hasPrev && (
          <Button type="button" onClick={stepState.toPrev}>
            {'<'}
          </Button>
        )}
        <Step name="field1">
          <Step1 />
        </Step>
        <Step name="field2">
          <Step2 />
        </Step>
        <Step name="field3">
          <Step3 />
        </Step>
      </Stack>
      <DevTool control={form.control} placement="bottom-right" />
    </FormProvider>
  );
}

const Step1 = () => {
  const stepState = useStepStateContext<typeof stepNames>();
  const { register, formState } = useFormContext<FieldValues>();

  return (
    <>
      Question 1: What do you like?
      <input
        type="text"
        {...register('field1', {
          required: {
            value: true,
            message: 'field1 is required',
          },
        })}
        placeholder="field1"
      />
      {formState.errors.field1?.message}
      {stepState.hasNext && (
        <Button
          type="button"
          disabled={!formState.dirtyFields.field1 || !!formState.errors.field1}
          onClick={stepState.toNext}
        >
          다음
        </Button>
      )}
    </>
  );
};

const Step2 = () => {
  const stepState = useStepStateContext<typeof stepNames>();
  const { register, formState } = useFormContext<FieldValues>();

  return (
    <>
      Question 2: What do you like?
      <input
        type="text"
        {...register('field2', {
          required: {
            value: true,
            message: 'field2 is required',
          },
        })}
        placeholder="field2"
      />
      {formState.errors.field2?.message}
      {stepState.hasNext && (
        <Button
          type="button"
          disabled={!formState.dirtyFields.field2 || !!formState.errors.field2}
          onClick={stepState.toNext}
        >
          다음
        </Button>
      )}
    </>
  );
};

const Step3 = () => {
  const { register, formState } = useFormContext<FieldValues>();

  return (
    <>
      Question 3: What do you like?
      <input
        type="text"
        {...register('field3', {
          required: {
            value: true,
            message: 'field3 is required',
          },
        })}
        placeholder="field3"
      />
      {formState.errors.field3?.message}
      <Button type="submit" disabled={!formState.isValid}>
        제출하기
      </Button>
    </>
  );
};
