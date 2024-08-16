import { FC, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlLock } from 'react-icons/sl';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAlert, useAuth } from '@/hooks';
import { Button, Input, LoadingIndicator } from '@/components/ui';
import { cn } from '@/utils';
import { passwordSchema } from '@/validation/validationSchemas';

type Props = {
  className?: string;
  onResetPassword?: () => void;
};

const ResetPasswordSchema = Yup.object().shape({
  password: passwordSchema,
  passwordConfirmation: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match'),
});

const ResetPasswordForm: FC<Props> = ({ className, onResetPassword }) => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code') || '';
  const { resetPasswordMutation } = useAuth();
  const { showErrorAlert } = useAlert();

  const formik = useFormik({
    initialValues: {
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: (values) => {
      if (resetPasswordMutation.isPending) return;
      if (!code) {
        showErrorAlert(
          'Invalid reset link:',
          'You should use the link sent to your email to reset your password.'
        );
        return;
      }
      resetPasswordMutation.mutate({ ...values, code });
    },
  });

  useEffect(() => {
    if (resetPasswordMutation.isSuccess && onResetPassword) {
      onResetPassword();
    }
  }, [resetPasswordMutation.isSuccess, onResetPassword]);

  return (
    <div className={cn('relative flex flex-col gap-5', className)}>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-3">
          <Input
            type="password"
            name="password"
            label="Password"
            autocomplete="new-password"
            placeholder="Password"
            iconPosition="start"
            IconComponent={SlLock}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            error={formik.touched.password && formik.errors.password}
          />

          <Input
            type="password"
            name="passwordConfirmation"
            label="Confirm Password"
            placeholder="Confirm Password"
            autocomplete="new-password"
            iconPosition="start"
            IconComponent={SlLock}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.passwordConfirmation}
            error={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
          />

          <Button type="submit" label="Reset password" size="button-lg" className="relative mt-4">
            Reset Password
          </Button>
        </div>
      </form>

      {resetPasswordMutation.isPending && (
        <LoadingIndicator variant="info" className="absolute inset-0 bg-white/50" />
      )}
    </div>
  );
};

export default ResetPasswordForm;
