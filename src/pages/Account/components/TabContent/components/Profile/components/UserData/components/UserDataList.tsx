import { FC } from 'react';
import {
  HiOutlineDevicePhoneMobile,
  HiOutlineEnvelope,
  HiOutlineMapPin,
  HiOutlineUserCircle,
} from 'react-icons/hi2';
import { cn } from '@/utils';
import { useAuth } from '@/hooks';

type Props = {
  className?: string;
};

const UserDataList: FC<Props> = ({ className }) => {
  const user = useAuth().data;
  const userDataList = [
    {
      title: 'Name',
      value: user?.name || 'Not specified',
      Icon: HiOutlineUserCircle,
    },
    {
      title: 'Email',
      value: user?.email || 'Not specified',
      Icon: HiOutlineEnvelope,
    },
    {
      title: 'Phone',
      value: user?.phone || 'Not specified',
      Icon: HiOutlineDevicePhoneMobile,
    },
    {
      title: 'Delivery address',
      value: user?.address || 'Not specified',
      Icon: HiOutlineMapPin,
    },
  ];

  return (
    <div className={cn('mx-auto max-w-7xl overflow-hidden rounded-lg bg-white border', className)}>
      <div className="grid grid-flow-row grid-cols-1 gap-4 p-4 md:gap-6 md:p-8 lg:grid-cols-2">
        {userDataList.map((userData) => (
          <div key={userData.title} className="flex items-center">
            <userData.Icon className="mr-3 size-8 min-w-8 text-primary-400 md:size-10 md:min-w-10" />
            <div>
              <p className="font-semibold md:text-lg">{userData.title}</p>
              <p className="text-secondary-500 md:text-base">{userData.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserDataList;
