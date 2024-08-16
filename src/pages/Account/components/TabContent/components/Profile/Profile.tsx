import { useState } from 'react';
import { FiUserX } from 'react-icons/fi';
import { Button, SectionTitle } from '@/components/ui';
import PasswordForm from './components/PasswordForm';
import UserData from './components/UserData/UserData';
import { useAuth } from '@/hooks';
import { Modal } from '@/components';

const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const { deleteUserMutation } = useAuth();

  const handleDeleteUser = () => {
    deleteUserMutation.mutate();
  };

  return (
    <>
      <SectionTitle className="mb-8">My Profile</SectionTitle>
      <UserData className="mb-5" />
      <PasswordForm className="mb-5" />
      <Button
        className="flex w-full"
        variant="secondary"
        size="button-md"
        onClick={() => setShowModal(true)}
        label="Delete Account"
      >
        <FiUserX className="size-5" />
        Delete Account
      </Button>

      <Modal
        isOpen={showModal}
        title="Delete Account"
        contentLabel="Delete-account-modal"
        onRequestClose={() => setShowModal(false)}
      >
        <div className="flex flex-col gap-5">
          <p className="text-sm text-gray-600">
            Are you sure you want to delete your account? This action is irreversible.
          </p>

          <div className="flex gap-4">
            <Button
              className="w-full"
              variant="outline"
              size="button-sm"
              onClick={handleDeleteUser}
              label="Delete Account"
            >
              Delete Account
            </Button>

            <Button
              className="w-full"
              variant="primary"
              size="button-sm"
              onClick={() => setShowModal(false)}
              label="Cancel"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Profile;
