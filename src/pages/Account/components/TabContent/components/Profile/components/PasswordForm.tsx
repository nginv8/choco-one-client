import { FC, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { RiCloseLargeLine, RiLock2Fill, RiLock2Line } from 'react-icons/ri';
import { Button, Input, LoadingIndicator } from '@/components/ui';
import { useAuth } from '@/hooks';
import { cn } from '@/utils';
import { passwordSchema } from '@/validation/validationSchemas';

type Props = {
  className?: string;
};

const UpdatePasswordSchema = Yup.object().shape({
  currentPassword: passwordSchema,
  password: passwordSchema,
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    .required('Required'),
});

const PasswordForm: FC<Props> = ({ className }) => {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const { updatePasswordMutation } = useAuth();

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      password: '',
      passwordConfirmation: '',
    },
    validationSchema: UpdatePasswordSchema,
    onSubmit: (values) => {
      updatePasswordMutation.mutate(values);
    },
  });

  useEffect(() => {
    if (updatePasswordMutation.isSuccess) {
      formik.resetForm();
      setShowPasswordForm(false);
    }
  }, [updatePasswordMutation.isSuccess]);

  return showPasswordForm ? (
    <form
      onSubmit={formik.handleSubmit}
      className={cn(
        'relative mx-auto p-4 md:p-8 max-w-7xl overflow-hidden rounded-lg bg-white shadow-md mt-5 flex flex-col gap-3',
        className
      )}
    >
      <div className="mb-4 flex justify-between">
        <h2 className="text-2xl font-semibold">Change Password</h2>
        <button type="button" onClick={() => setShowPasswordForm(false)} aria-label="Close modal">
          <RiCloseLargeLine className="size-6" />
        </button>
      </div>

      <Input
        type="password"
        name="currentPassword"
        label="Current Password"
        autocomplete="password"
        placeholder="Current password"
        iconPosition="start"
        IconComponent={RiLock2Line}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.currentPassword}
        error={formik.touched.currentPassword && formik.errors.currentPassword}
      />

      <Input
        type="password"
        name="password"
        label="New Password"
        placeholder="New Password"
        iconPosition="start"
        IconComponent={RiLock2Fill}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
        error={formik.touched.password && formik.errors.password}
      />

      <Input
        type="password"
        name="passwordConfirmation"
        label="Confirm New Password"
        placeholder="Confirm New Password"
        iconPosition="start"
        IconComponent={RiLock2Fill}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.passwordConfirmation}
        error={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
      />

      <Button type="submit" label="Save Account Changes" size="button-md">
        Save new password
      </Button>

      {updatePasswordMutation.isPending && (
        <LoadingIndicator variant="info" className="absolute inset-0 bg-white/50" />
      )}
    </form>
  ) : (
    <div className="mt-5 flex flex-col gap-y-4">
      <Button
        label="Change Password"
        variant="secondary"
        size="button-md"
        onClick={() => setShowPasswordForm(true)}
        className={cn('w-full', className)}
      >
        <RiLock2Line className="size-5 min-w-5" />
        Change Password
      </Button>
    </div>
  );
};

export default PasswordForm;
