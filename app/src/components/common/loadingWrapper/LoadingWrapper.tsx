import React from 'react';
import classNames from 'classnames';

import Empty from '../Empty';
import Loading from '../Loading';

interface LazyLoadingWrapperProps {
  loading: boolean;
  length: number;
  emptyIcon?: JSX.Element;
  emptyMessage: string;
  children: JSX.Element;
  loadingClassName?: string;
  emptyClassName?: string;
  emptyTextClassName?: string;
  isLazyLoading?: boolean;
  loadingWrapperClassName?: string;
}

function LoadingWrapper(props: LazyLoadingWrapperProps) {
  const {
    emptyIcon,
    emptyMessage,
    loading,
    children,
    loadingClassName,
    emptyClassName,
    emptyTextClassName,
    length,
    isLazyLoading = false,
    loadingWrapperClassName,
  } = props;

  const isDataListEmpty = !length;

  const showEmptyMessage = !loading && isDataListEmpty;

  return (
    <>
      {showEmptyMessage && (
        <div className={classNames(emptyClassName)}>
          <Empty message="Empty" />
        </div>
      )}

      {isLazyLoading && children}

      {!isDataListEmpty && !loading && !isLazyLoading && children}

      {loading && (
        <div className={loadingWrapperClassName}>
          <Loading />
        </div>
      )}
    </>
  );
}

export default LoadingWrapper;
