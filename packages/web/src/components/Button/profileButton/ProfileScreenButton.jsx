import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { cls } from '../../../lib/utils/profileButton';

const classes = {
  base: 'focus:outline-none transition ease-in-out duration-300',
  disabled: 'opacity-50 cursor-not-allowed',
  size: {
    small: 'px-3 py-2 text-xs',
    normal: 'h-[56px] px-[25px]',
    large: 'px-[40px] py-[24px] text-xl',
  },
  variant: {
    primary: 'text-lg md:text-md lg:text-md bg-[#5d387f] text-white rounded-lg hover:bg-[#2f1c40]',
    secondary:
      'text-lg md:text-md lg:text-md text-[black] border-2 rounded-lg border-[#d2d2d2] hover:bg-[#e8ddf2] hover:text-black',
    danger:
      'text-lg md:text-xl lg:text-xl text-[#ec1b1b] border-2 rounded-lg border-[#ec2b1b] hover:bg-[#ec1b1b]/50 hover:text-black',
  },
};

// eslint-disable-next-line react/display-name
const Button = forwardRef(
  (
    { children, type = 'button', className, variant = 'primary', size = 'normal', onClick, disabled = false, ...props },
    ref,
  ) => (
    <button
      ref={ref}
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={cls(`
                ${classes.base}
                ${classes.size[size]}
                ${classes.variant[variant]}
                ${disabled && classes.disabled}
                ${className}
            `)}
      {...props}
    >
      {children}
    </button>
  ),
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  submit: PropTypes.oneOf(['submit', 'button']),
  className: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger']),
  size: PropTypes.oneOf(['small', 'normal', 'large']),
};

export default Button;
