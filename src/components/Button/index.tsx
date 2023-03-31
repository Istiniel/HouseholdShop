import React from 'react';
import st from './button.module.scss';

type ButtonType = {
  type?: 'submit' | 'button' | 'reset' | undefined;
  color?: string;
  outlined?: boolean;
  children?: React.ReactNode | React.ReactElement;
  padding?: string;
  className?: string;
  callback?: (e: React.SyntheticEvent) => void;
};

const Button: React.FC<ButtonType> = (props) => {
  const { type, color, outlined, children, padding, callback, className } = props;

  let classes = `${st.button} `;
  color ? (classes += st[color] + ' ') : (classes += st.red + ' ');
  outlined && (classes += st.outlined + ' ');

  return (
    <button
      type={type}
      className={`${className ? className : ''} ${classes} `}
      style={{ padding: padding ? padding : '2.4rem 5rem' }}
      onClick={callback}
    >
      {children}
    </button>
  );
};

export default Button;
