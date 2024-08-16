import { FC, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { RiSendPlaneFill } from 'react-icons/ri';
import { Button, Input, LoadingIndicator } from '@/components/ui';
import { emailSchema } from '@/validation/validationSchemas';
import { useCreateSubscriber } from '@/hooks';

type Props = {
  className?: string;
};

const SignInSchema = Yup.object().shape({
  email: emailSchema,
});

const SubscribeForm: FC<Props> = ({ className }) => {
  const createSubscriberMutation = useCreateSubscriber();

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: SignInSchema,
    onSubmit: (values) => {
      if (createSubscriberMutation.isPending) return;
      createSubscriberMutation.mutate(values);
    },
  });

  useEffect(() => {
    if (createSubscriberMutation.isSuccess) {
      formik.resetForm();
    }
  }, [createSubscriberMutation.isSuccess]);

  return (
    <div className={className}>
      <p className="pb-2 font-extrabold">Follow us</p>
      <p className="pb-2 text-sm">Subscribe to receive updates on our store and special offers</p>

      <form onSubmit={formik.handleSubmit}>
        <Input
          type="email"
          id="email"
          autocomplete="email"
          placeholder="Enter your email"
          shape="roundedEnd"
          variant="borderless"
          disabled={createSubscriberMutation.isPending}
          onChange={formik.handleChange}
          value={formik.values.email}
          error={formik.touched.email && formik.errors.email}
        >
          <Button
            type="submit"
            label="Subscribe"
            size="button-lg"
            shape="roundedStart"
            disabled={createSubscriberMutation.isPending}
          >
            {createSubscriberMutation.isPending ? (
              <LoadingIndicator variant="primary" size="sm" />
            ) : (
              <RiSendPlaneFill className="size-6" />
            )}
          </Button>
        </Input>
      </form>
    </div>
  );
};

export default SubscribeForm;
