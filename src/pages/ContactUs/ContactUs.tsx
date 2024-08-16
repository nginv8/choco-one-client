import {
  HiOutlinePhone,
  HiOutlineClock,
  HiOutlineMapPin,
  HiOutlineEnvelope,
} from 'react-icons/hi2';
import { SectionTitle } from '@/components/ui';
import ContactForm from './components/ContactForm';
import { useShop } from '@/hooks';

const ContactUs = () => {
  const shopData = useShop().data;

  const info = [
    { title: 'Phone', value: shopData?.phones.map((p) => p.phone), IconComponent: HiOutlinePhone },
    { title: 'Working Hours', value: shopData?.workingHours, IconComponent: HiOutlineClock },
    { title: 'Address', value: shopData?.address, IconComponent: HiOutlineMapPin },
    {
      title: 'Email',
      value: shopData?.emails.map((e) => e.email),
      IconComponent: HiOutlineEnvelope,
    },
  ];

  return (
    <section className="grid grid-cols-12 gap-8">
      <SectionTitle className="col-span-12 xl:order-2 xl:col-span-6">Contact Us</SectionTitle>

      <div className="col-span-12 grid grid-cols-12 gap-5 xl:order-4 xl:col-span-6">
        {info.map(({ title, value, IconComponent }) => (
          <div key={title} className="col-span-12 flex sm:col-span-6 lg:col-span-3 xl:col-span-6">
            <div className="flex w-full flex-col items-center justify-center gap-2 rounded-lg bg-white p-5 pt-9 shadow-sm transition-all duration-300 hover:shadow-lg">
              <IconComponent className="mb-3 h-14 w-auto text-primary-400" />
              <div className="text-center">
                <h6 className="mb-1 font-bold capitalize">{title}</h6>
                {Array.isArray(value) ? (
                  value.map((valueItem) => (
                    <p key={valueItem} className="capitalize text-gray-500">
                      {valueItem}
                    </p>
                  ))
                ) : (
                  <p className=" capitalize text-gray-500">{value}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <SectionTitle className="col-span-12 mt-6 xl:order-1 xl:col-span-6 xl:mt-0">
        Leave a message
      </SectionTitle>
      <ContactForm className="col-span-12 xl:order-3 xl:col-span-6" />
    </section>
  );
};

export default ContactUs;
