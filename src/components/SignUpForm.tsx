import { FC, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { SlLock } from 'react-icons/sl';
import { HiOutlineUser, HiOutlineEnvelope } from 'react-icons/hi2';
import { useAuth } from '@/hooks';
import { Button, Input, LoadingIndicator } from '@/components/ui';
import { cn } from '@/utils';
import { emailSchema, nameSchema, passwordSchema } from '@/validation/validationSchemas';

type Props = {
  className?: string;
  onSignUp?: () => void;
};

const SignInSchema = Yup.object().shape({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    .required('Required'),
});

const SignUpForm: FC<Props> = ({ className, onSignUp }) => {
  const { signUpMutation } = useAuth();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: SignInSchema,
    onSubmit: (values) => {
      if (signUpMutation.isPending) return;
      signUpMutation.mutate({ ...values, username: values.email, rememberMe: false });
    },
  });

  useEffect(() => {
    if (signUpMutation.isSuccess && onSignUp) {
      onSignUp();
    }
  }, [signUpMutation.isSuccess, onSignUp]);

  return (
    <div className={cn('flex flex-col gap-5', className)}>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col gap-3">
          <Input
            type="text"
            name="name"
            placeholder="name"
            label="Name"
            autocomplete="name"
            IconComponent={HiOutlineUser}
            iconPosition="start"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            error={formik.touched.name && formik.errors.name}
          />
          <Input
            type="email"
            name="email"
            placeholder="email"
            label="Email"
            autocomplete="email"
            IconComponent={HiOutlineEnvelope}
            iconPosition="start"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            error={formik.touched.email && formik.errors.email}
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
          <Input
            type="password"
            name="confirmPassword"
            label="Confirm password"
            placeholder="Confirm password"
            iconPosition="start"
            IconComponent={SlLock}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            error={formik.touched.confirmPassword && formik.errors.confirmPassword}
          />

          <Button type="submit" label="Sign up" size="button-lg" className="mt-4">
            Sign up
          </Button>
        </div>
      </form>

      {signUpMutation.isPending && (
        <LoadingIndicator variant="info" className="absolute inset-0 bg-white/50" />
      )}
    </div>
  );
};

export default SignUpForm;
