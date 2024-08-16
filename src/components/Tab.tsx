import { FC } from 'react';
import { motion } from 'framer-motion';

type TabProps = {
  children: React.ReactNode;
  duration?: number;
  className?: string;
};

const Tab: FC<TabProps> = ({ children, duration = 0.3, className }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default Tab;
