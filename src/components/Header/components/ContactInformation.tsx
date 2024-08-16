import { HiOutlineEnvelope, HiOutlinePhone } from 'react-icons/hi2';
import { useShop } from '@/hooks';

const ContactInformation = () => {
  const { data: shopData, isLoading, isFetching } = useShop();

  return (
    <div className="flex gap-5">
      {(isLoading || isFetching) && (
        <>
          <span className="relative flex items-center gap-2 after:absolute after:right-[-10px] after:hidden after:h-full after:w-px after:bg-gray-700/25 md:after:flex">
            <HiOutlineEnvelope className=" flex text-xl text-primary-400" />
            <span className="h-4 w-28 animate-pulse rounded bg-gray-200" />
          </span>

          <span className="hidden items-center gap-2 md:flex">
            <HiOutlinePhone className=" flex text-xl text-primary-400" />
            <span className="h-4 w-24 animate-pulse rounded bg-gray-200" />
          </span>
        </>
      )}

      {shopData?.emails && shopData.emails?.length > 0 && (
        <a
          href={`mailto:${shopData.emails[0]?.email}`}
          className="relative flex items-center gap-2 after:absolute after:right-[-10px] after:hidden after:h-full after:w-px after:bg-gray-700/25 md:after:flex"
        >
          <HiOutlineEnvelope className="flex text-xl text-primary-400" />
          <span>{shopData.emails[0]?.email}</span>
        </a>
      )}

      {shopData?.phones && shopData.phones?.length > 0 && (
        <a className="hidden items-center gap-2 md:flex" href={`tel:${shopData.phones[0]?.phone}`}>
          <HiOutlinePhone className=" flex text-xl text-primary-400" />
          <span>{shopData.phones[0]?.phone}</span>
        </a>
      )}
    </div>
  );
};

export default ContactInformation;
