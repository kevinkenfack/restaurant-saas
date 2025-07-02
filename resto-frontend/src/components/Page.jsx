import React , { useEffect } from 'react';

export default function Page({children, className = 'px-4 py-3'}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={className}>{children}</div>
  )
}
