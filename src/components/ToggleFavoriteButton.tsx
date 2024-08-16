import { FC } from 'react';
import { BsHeart, BsHeartFill } from 'react-icons/bs';
import { useToggleFavoriteButton } from '@/hooks';
import AuthModal from './AuthModal';

type Props = {
  productId: number;
};

const ToggleFavoriteButton: FC<Props> = ({ productId }) => {
  const { handleClick, isItemFavorite, isAuthModalOpen, setIsAuthModalOpen } =
    useToggleFavoriteButton(productId);

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className="group absolute right-2 top-2 z-10 flex size-8 items-center justify-center rounded-full bg-white shadow-lg transition-transform duration-300 ease-in-out"
      >
        {isItemFavorite ? (
          <BsHeartFill className="mt-0.5 size-5 text-primary-400 transition-transform duration-300 ease-in-out group-hover:scale-110" />
        ) : (
          <BsHeart className="mt-0.5 size-5 text-primary-400 transition-transform duration-300 ease-in-out group-hover:scale-110" />
        )}
      </button>
      <AuthModal isAuthModalOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};

export default ToggleFavoriteButton;
