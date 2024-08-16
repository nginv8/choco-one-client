import { HiOutlineEnvelope, HiOutlineMapPin, HiOutlinePhone } from 'react-icons/hi2';
import { useShop } from '@/hooks';

const ContactInformation = () => {
  const { data: shopData, isLoading, isFetching } = useShop();

  return (
    <>
      {(isFetching || isLoading) && (
        <>
          <div className="mb-1 flex">
            <HiOutlineEnvelope className="me-3 size-6 text-primary-400" />
            <span className="h-4 w-28 rounded bg-gray-300" />
          </div>

          <div className="mb-1 flex">
            <HiOutlinePhone className="me-3 size-6 text-primary-400" />
            <span className="h-4 w-24 rounded bg-gray-300" />
          </div>

          <div className="mb-1 flex">
            <HiOutlineMapPin className="me-3 size-6 text-primary-400" />
            <span className="h-4 w-32 rounded bg-gray-300" />
          </div>
        </>
      )}

      {shopData?.emails && shopData.emails?.length > 0 && (
        <a href={`mailto:${shopData.emails[0]?.email}`} className="mb-1">
          <div className="flex">
            <HiOutlineEnvelope className="me-3 size-6 text-primary-400" />
            {shopData.emails[0]?.email}
          </div>
        </a>
      )}

      {shopData?.phones && shopData.phones?.length > 0 && (
        <a href={`tel:${shopData.phones[0]?.phone}`} className="mb-1">
          <div className="flex">
            <HiOutlinePhone className="me-3 size-6 text-primary-400" />
            {shopData.phones[0]?.phone}
          </div>
        </a>
      )}

      {shopData?.address && (
        <div className="mb-1 flex">
          <HiOutlineMapPin className="me-3 size-6 text-primary-400" />
          shopData.address
        </div>
      )}
    </>
  );
};

export default ContactInformation;
