import { FC, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { HiOutlineEnvelope, HiOutlineUser } from 'react-icons/hi2';
import { FiPhone, FiMapPin } from 'react-icons/fi';
import { Button, Input, LoadingIndicator, Select, Textarea } from '@/components/ui';
import useBoundStore from '@/store/useBoundStore';
import { useAlert, useAuth, useCartSummary, useCreateOrder, useShop } from '@/hooks';
import { cn, dataTransform } from '@/utils';
import {
  addressSchema,
  deliveryMethodSchema,
  eircodeSchema,
  emailSchema,
  nameSchema,
  orderCommentsSchema,
  paymentMethodSchema,
  phoneSchema,
} from '@/validation/validationSchemas';

type Props = {
  className?: string;
};

const orderSchema = Yup.object().shape({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  address: addressSchema,
  postalCode: eircodeSchema,
  delivery: deliveryMethodSchema,
  payment: paymentMethodSchema,
  comment: orderCommentsSchema,
});

const OrderForm: FC<Props> = ({ className }) => {
  const shopData = useShop().data;
  const user = useAuth().data;

  const cartItems = useBoundStore((state) => state.cartItems);
  const updateCartSummary = useBoundStore((state) => state.updateCartSummary);

  const createOrderMutation = useCreateOrder();
  const { grandTotal, currencySign } = useCartSummary();

  const { showErrorAlert } = useAlert();

  const formik = useFormik({
    initialValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      postalCode: '',
      delivery: '',
      payment: '',
      comment: '',
    },
    validationSchema: orderSchema,
    onSubmit: (form) => {
      if (createOrderMutation.isPending) return;

      if (!shopData || !grandTotal || !currencySign) {
        showErrorAlert('Something went wrong.', ' Please try again later.');
        return;
      }

      const orderData = {
        ...form,
        currency: shopData?.currency || '€',
        address: `${form.address}, ${form.postalCode}`,
        products: dataTransform.transformCartItemstoOrderItems(cartItems),
        totalPrice: grandTotal,
      };

      createOrderMutation.mutate(orderData);
    },
  });

  useEffect(() => {
    if (!shopData) return;

    const selectedDelivery = shopData.delivery.find((d) => d.name === formik.values.delivery);

    updateCartSummary({
      deliveryPrice: selectedDelivery ? selectedDelivery.price : 0,
    });
  }, [formik.values.delivery, shopData, updateCartSummary]);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={cn(
        'relative p-4 md:p-8 col-span-12 flex flex-col gap-3 bg-white overflow-hidden rounded-lg sm:col-span-7 xl:col-span-8 shadow-md',
        className
      )}
    >
      <Input
        type="text"
        name="name"
        label="Name"
        placeholder="Name"
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
        label="Email"
        placeholder="Email"
        autocomplete="email"
        IconComponent={HiOutlineEnvelope}
        iconPosition="start"
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
        IconComponent={FiPhone}
        iconPosition="start"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.phone}
        error={formik.touched.phone && formik.errors.phone}
      />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          type="text"
          name="address"
          label="Address"
          placeholder="Address"
          autocomplete="address"
          IconComponent={FiMapPin}
          iconPosition="start"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.address}
          error={formik.touched.address && formik.errors.address}
        />
        <Input
          type="text"
          name="postalCode"
          label="Postal Code"
          placeholder="Postal Code"
          autocomplete="postal-code"
          IconComponent={FiMapPin}
          iconPosition="start"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.postalCode.toUpperCase()}
          error={formik.touched.postalCode && formik.errors.postalCode}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {shopData && shopData.payment.length > 0 && (
          <Select
            name="payment"
            label="Payment Method"
            value={formik.values.payment}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Select payment method"
            error={formik.touched.payment && formik.errors.payment}
          >
            {shopData &&
              shopData.payment.map((payment) => (
                <option key={payment.name} value={payment.name}>
                  {payment.name}
                </option>
              ))}
          </Select>
        )}

        {shopData && shopData.delivery.length > 0 && (
          <Select
            name="delivery"
            label="Delivery Method"
            value={formik.values.delivery}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Select delivery method"
            error={formik.touched.delivery && formik.errors.delivery}
          >
            {shopData.delivery.map((delivery) => (
              <option key={delivery.name} value={delivery.name}>
                {delivery.name} ({currencySign} {delivery.price})
              </option>
            ))}
          </Select>
        )}
      </div>

      <Textarea
        name="comment"
        label="Order Comments"
        value={formik.values.comment}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder="Order Comments"
      />

      <Button type="submit" label="Send order" variant="primary">
        {createOrderMutation.isPending ? 'Processing...' : 'Place Order'}
      </Button>

      {createOrderMutation.isPending && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50">
          <LoadingIndicator variant="info" />
        </div>
      )}
    </form>
  );
};

export default OrderForm;
