import { LiaShippingFastSolid } from 'react-icons/lia';
import { BsCashCoin } from 'react-icons/bs';
import { RiSecurePaymentLine } from 'react-icons/ri';
import { BiSupport } from 'react-icons/bi';

const benefitList = [
  {
    title: 'Free Shipping',
    description: 'For all order of $100',
    IconComponent: LiaShippingFastSolid,
  },
  {
    title: 'Money Back',
    description: 'With a 30 day',
    IconComponent: BsCashCoin,
  },
  {
    title: 'Secure Payment',
    description: 'Secured payment',
    IconComponent: RiSecurePaymentLine,
  },
  {
    title: 'Online Support',
    description: 'Support 24/7',
    IconComponent: BiSupport,
  },
];

function Benefits() {
  return (
    <section>
      <div className="grid grid-cols-12 gap-5">
        {benefitList.map(({ title, description, IconComponent }) => (
          <div key={title} className="col-span-12 flex rounded sm:col-span-6 lg:col-span-3">
            <div className="flex w-full flex-col items-center justify-center gap-2 rounded  bg-white p-5 pt-9 shadow-sm transition-all duration-300 hover:shadow-lg">
              <IconComponent className="mb-3 size-14 text-primary-400" />
              <div className="text-center">
                <h6 className="font-bold capitalize">{title}</h6>
                <p className="text-sm text-gray-400">{description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Benefits;
