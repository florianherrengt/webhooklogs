import React from 'react';
import { useTimeout } from 'react-use';

export const Loading: React.FunctionComponent = () => {
  const [show] = useTimeout(500);
  if (!show()) return null;
  return (
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  );
};
