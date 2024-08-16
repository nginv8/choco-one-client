import { FC } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { HiOutlineUser, HiOutlineEnvelope } from 'react-icons/hi2';
import { Button, Input, LoadingIndicator, Textarea } from '@/components/ui';
import { useAuth, useSupportRequest } from '@/hooks';
import { emailSchema, messageSchema, nameSchema } from '@/validation/validationSchemas';
import { cn } from '@/utils';

type Props = {
  className?: string;
};

const SupportDataSchema = Yup.object().shape({
  name: nameSchema,
  email: emailSchema,
  message: messageSchema,
});

const SupportForm: FC<Props> = ({ className }) => {
  const user = useAuth().data;
  const createSupportRequestMutation = useSupportRequest();

  const formik = useFormik({
    initialValues: {
      name: user?.name || '',
      email: user?.email || '',
      message: '',
      theme: 'Contact Us',
    },
    validationSchema: SupportDataSchema,
    onSubmit: (values) => {
      if (createSupportRequestMutation.isPending) return;
      createSupportRequestMutation.mutate(values, {
        onSuccess: () => {
          formik.resetForm();
        },
      });
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={cn(
        'relative mx-auto flex max-w-7xl w-full flex-col gap-3 overflow-hidden rounded-lg bg-white p-4 border md:p-8',
        className
      )}
    >
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
        name="email"
        type="email"
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

      <Textarea
        name="message"
        label="Message"
        placeholder="How can we help?"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.message}
        error={formik.touched.message && formik.errors.message}
      />

      <Button type="submit" size="button-md" label="Send support request">
        Send a message
      </Button>

      {createSupportRequestMutation.isPending && (
        <LoadingIndicator variant="info" className="absolute inset-0 bg-white/50" />
      )}
    </form>
  );
};

export default SupportForm;
