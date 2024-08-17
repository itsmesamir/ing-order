import React from 'react';
import classNames from 'classnames';
import { Spinner } from '@chakra-ui/react';

interface LoadingProps {
  className?: string;
  hasBackground?: boolean;
  size?: string;
}

function Loading(props: LoadingProps) {
  const { className, hasBackground, size = 'md' } = props;

  return (
    <div
      className={classNames(' bg-white', className, {
        'flex justify-center items-center min-h-300 min-w-full bg-white md:min-h-[calc(100vh - 126px)] relative':
          hasBackground,
      })}
    >
      <Spinner size={size} />
    </div>
  );
}

export default Loading;
