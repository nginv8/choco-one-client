import { FC } from 'react';
import { Footer, Header } from '@/components';
import AlertContainer from './AlertContainer/AlertContainer';
import { useNavigationEffect } from '@/hooks';

type Props = {
  children: React.ReactNode;
};

const Layout: FC<Props> = ({ children }) => {
  useNavigationEffect();

  return (
    <>
      <h1 className="sr-only">App</h1>
      <div className="flex min-h-screen flex-col overflow-x-hidden">
        <Header className="container mx-auto px-2 md:px-5" />
        <div className="container mx-auto grid gap-y-8 px-2 py-8 md:px-5 lg:gap-y-8">
          {children}
        </div>
        <Footer className="container mx-auto px-2 md:px-5" />
      </div>
      <AlertContainer />
    </>
  );
};

export default Layout;
