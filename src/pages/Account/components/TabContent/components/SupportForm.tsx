import { useFormik } from 'formik';
import * as Yup from 'yup';
import { HiOutlineUser, HiOutlineEnvelope } from 'react-icons/hi2';
import { Button, Input, LoadingIndicator, SectionTitle, Textarea } from '@/components/ui';
import { useAuth, useSupportRequest } from '@/hooks';

const SupportRequestSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  message: Yup.string().required('Message is required'),
});

const SupportForm = () => {
  const user = useAuth().data;
  const createSupportRequestMutation = useSupportRequest();

  const formik = useFormik({
    initialValues: {
      name: user?.name || '',
      email: user?.email || '',
      message: '',
      theme: 'Support',
    },
    validationSchema: SupportRequestSchema,
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
    <>
      <SectionTitle className="mb-8">Support</SectionTitle>

      <form
        className="relative mx-auto mt-5 flex max-w-7xl flex-col gap-3 overflow-hidden rounded-lg border bg-white p-4 md:p-8"
        onSubmit={formik.handleSubmit}
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
        <Textarea
          name="message"
          label="Message"
          placeholder="How can we help?"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.message}
          error={formik.touched.message && formik.errors.message}
        />

        <Button type="submit" label="Send support request">
          Send message
        </Button>

        {createSupportRequestMutation.isPending && (
          <LoadingIndicator variant="info" className="absolute inset-0 bg-white/50" />
        )}
      </form>
    </>
  );
};

export default SupportForm;
