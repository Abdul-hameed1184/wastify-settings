/* eslint-disable no-unused-vars */
import React from 'react';
import clsx from 'clsx'; // Optional: for cleaner class merging

type Props = {
  id?: string;
  type?: string;
  name?: string;
  pattern?: string;
  maxLength?: number;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string | null | boolean;
  required?: boolean;
  list?: string;
  disabled?: boolean;
  className?: string;
} & React.HTMLProps<HTMLInputElement>; // Optional: allow all native input props

const Input = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      id,
      type = 'text',
      name,
      pattern,
      maxLength,
      value,
      defaultValue,
      placeholder,
      onChange,
      onBlur,
      list,
      error,
      required,
      disabled,
      className,
      ...rest // capture any extra native props
    },
    ref
  ) => {
    return (
      <div className="w-full">
        <input
          id={id}
          type={type}
          name={name}
          pattern={pattern}
          maxLength={maxLength}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          list={list}
          required={required}
          disabled={disabled}
          ref={ref}
          {...rest}
          className={clsx(
            // Base styles
            'block w-full',
            'px-2 py-3 pl-5',
            'bg-grayInput shadow-sm rounded-lg',
            'font-Poppins h-14 text-black text-base mt-1',
            'border-2 transition-all duration-200 ease-in-out',
            'focus:outline-none focus:ring-2 focus:ring-offset-1',
            'placeholder:text-gray-400 text-gray-800',

            // Conditional border & focus ring
            error
              ? 'border-red-500 focus:ring-red-400 focus:border-red-500'
              : 'border-gray-300 focus:border-green focus:ring-green/50',

            // User override
            className
          )}
        />
        {error && typeof error === 'string' && (
          <p className="mt-1 text-xs font-medium text-red-600">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input'; // For React DevTools

export default Input;