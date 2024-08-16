import { BsBasket2Fill } from 'react-icons/bs';
import { FaUser } from 'react-icons/fa6';
import { LuLogOut } from 'react-icons/lu';
import { BiSupport } from 'react-icons/bi';
import useBoundStore from '@/store/useBoundStore';
import { useAuth } from '@/hooks';
import TabItem from './components/TabItem';

const TabList = () => {
  const activeTab = useBoundStore((state) => state.activeTab);
  const setActiveTab = useBoundStore((state) => state.setActiveTab);
  const { signOut } = useAuth();

  return (
    <ul className="rounded-lg border bg-white p-5">
      <TabItem
        text="Profile"
        IconComponent={FaUser}
        isActive={activeTab === 'profile'}
        onClick={() => setActiveTab('profile')}
      />
      <TabItem
        text="Orders"
        IconComponent={BsBasket2Fill}
        isActive={activeTab === 'orders'}
        onClick={() => setActiveTab('orders')}
      />
      <TabItem
        text="Support"
        IconComponent={BiSupport}
        isActive={activeTab === 'support'}
        onClick={() => setActiveTab('support')}
      />
      <TabItem text="Log out" IconComponent={LuLogOut} onClick={signOut} />
    </ul>
  );
};

export default TabList;
