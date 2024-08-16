import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { routesList } from '@/data';
import TabsContent from './components/TabContent/TabContent';
import TabList from './components/TabList/TabList';
import { useAuth } from '@/hooks';

const Account = () => {
  const user = useAuth().data;
  const navigate = useNavigate();
  const goToSignIn = () => navigate(routesList.signIn.path);

  useEffect(() => {
    if (!user) goToSignIn();
  }, [user]);

  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-12 md:col-span-4 md:mt-[84px]">
        <TabList />
      </div>
      <div className="col-span-12 md:col-span-8">
        <TabsContent />
      </div>
    </div>
  );
};

export default Account;
