import type { FC, ReactNode } from 'react';
import cn from '../../utils/cn';

interface GridProps {
  children: ReactNode;
  className?: string;
  classNameChild?: string;
}

export const GridLayout: FC<GridProps> = ({
  children,
  className = '',
  classNameChild = '',
}) => {
  return (
    <div
      className={cn(
        'container mx-auto mt-8 mb-2 max-w-screen-xl grow px-0 sm:px-5',
        className
      )}
    >
      <div className={cn('grid grid-cols-11 lg:gap-8', classNameChild)}>
        {children}
      </div>
    </div>
  );
};
export const GridItemFour: FC<GridProps> = ({ children, className = '' }) => {
  return (
    // span 4 / span 4 表示跨越4列
    <div className={cn('col-span-11 md:col-span-11 lg:col-span-4', className)}>
      {children}
    </div>
  );
};

export const GridItemEight: FC<GridProps> = ({ children, className = '' }) => {
  return (
    <div
      className={cn('col-span-11 mb-5 md:col-span-11 lg:col-span-7', className)}
    >
      {children}
    </div>
  );
};
