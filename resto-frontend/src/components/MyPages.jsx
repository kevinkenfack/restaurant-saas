import React, { useEffect } from 'react';

export default function OrderPage({children, className = 'px-4 py-3'}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={`force-light ${className}`}>
      {children}
    </div>
  );
}