import { FC, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronDown } from 'react-icons/hi2';
import { cn } from '@/utils';

type DescriptionProps = {
  className?: string;
  longDescriptions?:
    | {
        name: string;
        content: string;
      }[]
    | null;
};

type DescriptionItemProps = {
  name: string;
  content: string;
};

const DescriptionItem: FC<DescriptionItemProps> = ({ name, content }) => {
  const [isClosed, setIsClosed] = useState(true);

  const handleClick = () => {
    setIsClosed(!isClosed);
  };

  return (
    <div className="overflow-hidden border-b first:rounded-t-lg last:rounded-b-lg last:border-none">
      <button
        type="button"
        aria-label="show more"
        className="relative bottom-0 z-10 flex w-full items-center justify-between bg-white p-5 ps-8 text-center text-2xl font-bold outline-none transition-colors duration-300 hover:text-primary-400 focus:outline-none lg:text-2xl"
        onClick={handleClick}
      >
        <span className="text-lg font-semibold">{name}</span>
        <HiChevronDown
          className={`size-8 transition-transform duration-300 ${isClosed ? '' : 'rotate-180'}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {!isClosed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative overflow-hidden bg-white/50 px-8"
          >
            <div
              className="prose prose-slate mx-auto py-8 lg:prose-lg"
              /* eslint-disable-next-line react/no-danger */
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Description: FC<DescriptionProps> = ({ longDescriptions, className }) => (
  <div className={cn('min-w-60', className)}>
    {longDescriptions &&
      longDescriptions.length > 0 &&
      longDescriptions.map((description) => (
        <DescriptionItem
          key={description.name}
          name={description.name}
          content={description.content}
        />
      ))}
  </div>
);

export default Description;
