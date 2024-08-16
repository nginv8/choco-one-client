import useBoundStore from '@/store/useBoundStore';
import { Tab } from '@/components';
import Profile from './components/Profile/Profile';
import OrderList from './components/OrderList/OrderList';
import SupportForm from './components/SupportForm';

const TabsContent = () => {
  const activeTab = useBoundStore((state) => state.activeTab);

  return (
    <div>
      {activeTab === 'profile' && (
        <Tab>
          <Profile />
        </Tab>
      )}

      {activeTab === 'orders' && (
        <Tab>
          <OrderList />
        </Tab>
      )}

      {activeTab === 'support' && (
        <Tab>
          <SupportForm />
        </Tab>
      )}
    </div>
  );
};

export default TabsContent;
