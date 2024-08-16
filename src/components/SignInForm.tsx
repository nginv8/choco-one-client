import { FC, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { SlLock } from 'react-icons/sl';
import { HiOutlineEnvelope } from 'react-icons/hi2';
import { useAuth } from '@/hooks';
import { Button, Checkbox, Input, LoadingIndicator } from '@/components/ui';
import { cn } from '@/utils';
import { emailSchema, passwordSchema } from '@/validation/validationSchemas';
import Modal from './Modal';
import RestorePasswordForm from './RestorePasswordForm';

type Props = {
  className?: string;
  onSignIn?: () => void;
};

const SignInSchema = Yup.object().shape({
  identifier: emailSchema,
  password: passwordSchema,
});

const SignInForm: FC<Props> = ({ className, onSignIn }) => {
  const [isFogotPasswordModalOpen, setIsFogotPasswordModalOpen] = useState(false);
  const { signInMutation, isLoading, isFetching } = useAuth();

  const formik = useFormik({
    initialValues: {
      identifier: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: SignInSchema,
    onSubmit: (values) => {
      if (signInMutation.isPending) return;
      signInMutation.mutate(values);
    },
  });

  useEffect(() => {
    if (signInMutation.isSuccess && onSignIn) {
      onSignIn();
    }
  }, [signInMutation.isSuccess, onSignIn]);

  return (
    <div className={cn('relative flex flex-col gap-5', className)}>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-3">
          <Input
            type="text"
            name="identifier"
            placeholder="Email"
            label="Email"
            autocomplete="email"
            iconPosition="start"
            IconComponent={HiOutlineEnvelope}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.identifier}
            error={formik.touched.identifier && formik.errors.identifier}
          />

          <Input
            type="password"
            name="password"
            label="Password"
            autocomplete="password"
            placeholder="Password"
            iconPosition="start"
            IconComponent={SlLock}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            error={formik.touched.password && formik.errors.password}
          />

          <Button type="submit" label="Sign in" size="button-lg" className="relative mt-4">
            Sign in
          </Button>
        </div>
        <div className="relative mt-4 flex flex-wrap items-center justify-between gap-4">
          <Checkbox
            name="rememberMe"
            onChange={formik.handleChange}
            checked={formik.values.rememberMe}
          >
            <span>Remember</span>
          </Checkbox>

          <button
            type="button"
            onClick={() => setIsFogotPasswordModalOpen(true)}
            className="text-[#3091ff] hover:underline"
          >
            Forgot Password?
          </button>
        </div>
      </form>

      {(signInMutation.isPending || isLoading || isFetching) && (
        <LoadingIndicator variant="info" className="absolute inset-0 bg-white/50" />
      )}

      <Modal
        isOpen={isFogotPasswordModalOpen}
        title="Restore password"
        contentLabel="Restore password modal"
        shouldCloseOnEsc={true}
        onRequestClose={() => setIsFogotPasswordModalOpen(false)}
      >
        <RestorePasswordForm onSuccess={() => setIsFogotPasswordModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default SignInForm;
