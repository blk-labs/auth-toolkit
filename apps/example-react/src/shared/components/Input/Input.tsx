import { forwardRef } from 'react';
import type { InputProps } from './Input.types';
import { classNames } from '../utils/classNames';
import { useState } from 'react';
import { Icon } from '@iconify/react';

const baseClass = `p-3 w-full font-semibold text-white rounded-md   outline-none focus:outline-none border  text-sm  placeholder:text-neutral-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed`;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, disabled, className, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    if (props.type === 'password') {
      return (
        <div className="flex flex-col items-start text-left w-full">
          {label && <label className="mb-1 text-base font-semibold text-white">{label}</label>}
          {/* <input
            ref={ref}
            className={classNames(
              baseClass,
              error ? 'border-danger/40 border-3!' : 'border-neutral-400 focus:ring-primary-300',
              className,
            )}
            disabled={disabled}
            {...props}
          /> */}
          <div
            className={classNames(
              baseClass,
              error ? 'border-danger/40 border-3!' : 'border-neutral-400 focus:ring-primary-300',
              'flex items-center gap-1 p-0! pr-3!',
              className,
            )}
          >
            <input
              ref={ref}
              {...props}
              type={showPassword ? 'text' : 'password'}
              className="w-full p-3 outline-0 border-none h-full self-stretch"
            />
            <Icon
              onClick={() => {
                setShowPassword((prev) => !prev);
              }}
              className="shrink-0 cursor-pointer"
              icon={showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'}
              fontSize={21}
            />
          </div>
          {error && <span className="mt-1 text-xs text-danger">{error}</span>}
        </div>
      );
    }

    return (
      <div className="flex flex-col items-start text-left w-full">
        {label && <label className="mb-1 text-base font-semibold text-white">{label}</label>}
        <input
          ref={ref}
          className={classNames(
            baseClass,
            error ? 'border-danger/40 border-3!' : 'border-neutral-400 focus:ring-primary-300',
            className,
          )}
          disabled={disabled}
          {...props}
        />
        {error && <span className="mt-1 text-xs text-danger">{error}</span>}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
