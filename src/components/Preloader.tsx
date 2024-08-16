import { FC } from 'react';
import { FaCandyCane } from 'react-icons/fa6';

type Props = {
  isVisible: boolean;
};

const Preloader: FC<Props> = ({ isVisible }) => {
  return (
    <div
      className={`flex min-h-screen items-center justify-center bg-white transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="flex flex-col items-center">
        <FaCandyCane className="animate-bounce text-6xl text-primary-400" />
        <p className="mt-4 text-2xl font-medium text-primary-400">Loading...</p>
      </div>
    </div>
  );
};

export default Preloader;
