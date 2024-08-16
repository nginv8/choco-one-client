import { FC, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { HiOutlineEnvelope, HiOutlineMapPin, HiOutlinePhone, HiOutlineUser } from 'react-icons/hi2';
import { RiCloseLargeLine, RiLock2Line } from 'react-icons/ri';
import { Button, Input, LoadingIndicator } from '@/components/ui';
import { useAuth } from '@/hooks';
import { cn } from '@/utils';
import {
  addressSchema,
  emailSchema,
  nameSchema,
  passwordSchema,
  phoneSchema,
} from '@/validation/validationSchemas';

type Props = {
  className?: string;
  onClose?: () => void;
};

const UpdateUserDataSchema = Yup.object().shape({
  email: emailSchema,
  currentPassword: passwordSchema,
  phone: phoneSchema.optional(),
  name: nameSchema.optional(),
  address: addressSchema.optional(),
});

const UserDataForm: FC<Props> = ({ className, onClose }) => {
  const { data: user, updateUserDataMutation } = useAuth();

  const formik = useFormik({
    initialValues: {
      name: user?.name || '',
      email: user?.email || '',
      address: user?.address || '',
      phone: user?.phone || '',
      currentPassword: '',
    },
    validationSchema: UpdateUserDataSchema,
    onSubmit: async (values) => {
      updateUserDataMutation.mutate(values);
    },
  });

  useEffect(() => {
    if (updateUserDataMutation.isSuccess) {
      formik.resetForm();
      if (onClose) onClose();
    }
  }, [updateUserDataMutation.isSuccess]);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={cn(
        'relative mx-auto p-4 md:p-8 max-w-7xl overflow-hidden rounded-lg bg-white shadow-md mt-5 flex flex-col gap-3',
        className
      )}
    >
      <div className="mb-4 flex justify-between gap-x-4 align-top">
        <h2 className="text-xl font-semibold md:text-2xl">Change Account Information</h2>
        <button type="button" onClick={onClose} className="size-6" aria-label="Close modal">
          <RiCloseLargeLine className="size-6" />
        </button>
      </div>

      <Input
        type="text"
        name="name"
        label="Name"
        placeholder="Name"
        autocomplete="name"
        iconPosition="start"
        IconComponent={HiOutlineUser}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name}
        error={formik.touched.name && formik.errors.name}
      />

      <Input
        type="email"
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

      <Input
        type="text"
        name="phone"
        label="Phone"
        placeholder="Phone"
        autocomplete="phone"
        iconPosition="start"
        IconComponent={HiOutlinePhone}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.phone}
        error={formik.touched.phone && formik.errors.phone}
      />

      <Input
        type="text"
        name="address"
        label="Address"
        placeholder="Address"
        autocomplete="address"
        iconPosition="start"
        IconComponent={HiOutlineMapPin}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.address}
        error={formik.touched.address && formik.errors.address}
      />

      <Input
        type="password"
        name="currentPassword"
        label="Password"
        placeholder="Password"
        autocomplete="password"
        iconPosition="start"
        IconComponent={RiLock2Line}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.currentPassword}
        error={formik.touched.currentPassword && formik.errors.currentPassword}
      />
      <Button type="submit" label="Save Account Changes" size="button-md">
        Save Changes
      </Button>

      {updateUserDataMutation.isPending && (
        <LoadingIndicator variant="info" className="absolute inset-0 bg-white/50" />
      )}
    </form>
  );
};

export default UserDataForm;
