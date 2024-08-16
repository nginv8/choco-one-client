import { FC, useState } from 'react';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { Button } from '@/components/ui';
import UserDataForm from './components/UserDataForm';
import UserDataList from './components/UserDataList';
import { cn } from '@/utils';

type Props = {
  className?: string;
};

const UserData: FC<Props> = ({ className }) => {
  const [showUserDataForm, setShowUserDataForm] = useState(false);

  return showUserDataForm ? (
    <UserDataForm className={className} onClose={() => setShowUserDataForm(false)} />
  ) : (
    <div className={(cn('flex flex-col gap-y-4'), className)}>
      <UserDataList className="mb-5 w-full" />

      <Button
        label="Change Account Information"
        variant="secondary"
        size="button-md"
        onClick={() => setShowUserDataForm(true)}
        className="w-full bg-white"
      >
        <HiOutlinePencilSquare className="size-5 min-w-5" />
        Change Account Information
      </Button>
    </div>
  );
};

export default UserData;
