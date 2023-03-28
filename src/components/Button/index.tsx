import React from 'react';
import st from './button.module.scss';

type ButtonType = {
  type?: 'submit' | 'button' | 'reset' | undefined;
  color?: string;
  outlined?: boolean;
  children?: React.ReactNode | React.ReactElement;
  padding?: string;
};

const Button: React.FC<ButtonType> = ({ type, color, outlined, children, padding }) => {
  let classes = `${st.button} `;
  color ? (classes += st[color] + ' ') : (classes += st.red + ' ');
  outlined && (classes += st.outlined + ' ');

  return (
    <button type={type} className={classes} style={{ padding: padding ? padding : '2.4rem 5rem' }}>
      {children}
    </button>
  );
};

export default Button;
