import React from 'react';

type ProductTagProps = {
  children: React.ReactNode;
};

const ProductTag = ({ children }: ProductTagProps) => {
  return <div>{children}</div>;
};

export default ProductTag;
