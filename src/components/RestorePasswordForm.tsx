import { FC, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { HiOutlineEnvelope } from 'react-icons/hi2';
import { useAuth } from '@/hooks';
import { Button, Input, LoadingIndicator } from '@/components/ui';
import { cn } from '@/utils';
import { emailSchema } from '@/validation/validationSchemas';

type Props = {
  className?: string;
  onSuccess?: () => void;
  onSend?: () => void;
};

const RestorePasswordForm: FC<Props> = ({ className, onSuccess, onSend }) => {
  const { data: user, restorePasswordMutation } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: user?.email || '',
    },
    validationSchema: Yup.object().shape({
      email: emailSchema,
    }),
    onSubmit: (values) => {
      if (restorePasswordMutation.isPending) return;
      restorePasswordMutation.mutate(values.email);
      if (onSend) onSend();
      formik.resetForm();
    },
  });

  useEffect(() => {
    if (restorePasswordMutation.isSuccess && onSuccess) {
      onSuccess();
    }
  }, [restorePasswordMutation.isSuccess, onSuccess]);

  return (
    <div className={cn('relative flex flex-col gap-5', className)}>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-3">
          <Input
            type="text"
            name="email"
            label="Email"
            placeholder="Email"
            autocomplete="email"
            iconPosition="start"
            IconComponent={HiOutlineEnvelope}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.touched.email && formik.errors.email}
          />

          <Button type="submit" label="" size="button-lg" className="relative mt-4">
            {restorePasswordMutation.isPending ? 'Sending...' : 'Send Reset Link'}
          </Button>
        </div>
      </form>

      {restorePasswordMutation.isPending && (
        <LoadingIndicator variant="info" className="absolute inset-0 bg-white/50" />
      )}
    </div>
  );
};

export default RestorePasswordForm;
