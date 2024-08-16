import { FC, useCallback, useEffect, useState } from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import Modal from './Modal';
import { Button } from './ui';

type Props = {
  onClose: () => void;
  isAuthModalOpen: boolean;
};

const AuthModal: FC<Props> = ({ onClose, isAuthModalOpen }) => {
  const [modalSettings, setModalSettings] = useState({
    isOpen: false,
    haveAccount: false,
    title: '',
    contentLabel: '',
  });

  const closeModal = useCallback(() => {
    setModalSettings((prevSettings) => ({ ...prevSettings, isOpen: false }));
    if (onClose) onClose();
  }, []);

  const openSignInModal = () => {
    setModalSettings({
      isOpen: true,
      haveAccount: true,
      title: 'Sign In',
      contentLabel: 'SignIn-modal',
    });
  };

  const openSignUpModal = () => {
    setModalSettings({
      isOpen: true,
      haveAccount: false,
      title: 'Sign up',
      contentLabel: 'Sign-up-modal',
    });
  };

  useEffect(() => {
    if (isAuthModalOpen) {
      openSignInModal();
    }
  }, [isAuthModalOpen]);

  return (
    <Modal
      isOpen={modalSettings.isOpen}
      title={modalSettings.title}
      contentLabel={modalSettings.contentLabel}
      onRequestClose={closeModal}
    >
      {modalSettings.haveAccount ? (
        <>
          <SignInForm onSignIn={closeModal} className="mb-8" />

          <span className="mb-2 block text-lg font-semibold">New customer?</span>
          <span className="mb-5 block">
            Sign up for an account to take advantage of order history as well as pre-filled forms
            during checkout on subsequent orders.
          </span>
          <Button onClick={openSignUpModal} label="Sign in" variant="outline" size="button-md">
            Sign up
          </Button>
        </>
      ) : (
        <>
          <SignUpForm onSignUp={openSignInModal} className="mb-8" />

          <span className="mb-2 block text-lg font-semibold">Already a customer?</span>
          <span className="mb-5 block">
            Log in to access your account, view order history, and manage your information.
          </span>

          <Button onClick={openSignInModal} label="Sign in" variant="outline" size="button-md">
            Sign in
          </Button>
        </>
      )}
    </Modal>
  );
};

export default AuthModal;
