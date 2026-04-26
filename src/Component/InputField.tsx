/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import clsx from 'clsx';

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
  label?: string;

  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  onIconClick?: (
    e: React.MouseEvent<HTMLSpanElement> | React.KeyboardEvent<HTMLSpanElement>
  ) => void;
  iconAriaLabel?: string;
  iconClassName?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      id,
      type = 'text',
      label,
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
      icon,
      iconPosition = 'left',
      onIconClick,
      iconAriaLabel,
      iconClassName,
      ...rest
    },
    ref
  ) => {
    const [hasValue, setHasValue] = useState(
      Boolean(value ?? defaultValue)
    );

    const isControlled = value !== undefined;

    useEffect(() => {
      if (isControlled) {
        setHasValue(Boolean(value));
      }
    }, [value, isControlled]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setHasValue(Boolean(e.target.value));
      }
      onChange?.(e);
    };

    const showIcon = icon && !hasValue;
    const leftIcon = showIcon && iconPosition === 'left';
    const rightIcon = showIcon && iconPosition === 'right';

    const handleIconKeyDown = (e: React.KeyboardEvent<HTMLSpanElement>) => {
      if (!onIconClick) return;
      if (e.key === 'Enter' || e.key === ' ') {
        onIconClick(e);
        e.preventDefault();
      }
    };

    return (
      <div className="flex flex-col mb-4">
        {label && <label htmlFor={name} className="text-black">{label}</label>}
      <div className="relative w-full">
        {leftIcon && (
          <span
            className={clsx(
              'absolute left-4 top-1/2 -translate-y-1/2 flex items-center text-black',
              iconClassName,
              onIconClick ? 'cursor-pointer' : 'pointer-events-none'
            )}
            role={onIconClick ? 'button' : undefined}
            tabIndex={onIconClick ? 0 : undefined}
            aria-label={iconAriaLabel}
            onClick={onIconClick}
            onKeyDown={handleIconKeyDown}
          >
            {icon}
          </span>
        )}

        <input
          id={id}
          ref={ref}
          type={type}
          name={name}
          pattern={pattern}
          maxLength={maxLength}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          onChange={handleChange}
          onBlur={onBlur}
          list={list}
          required={required}
          disabled={disabled}
          {...rest}
          className={clsx(
            'block w-full h-14 rounded-lg px-4',
            'border  text-base',
            'transition-all duration-200',
            'placeholder:text-gray-400',
            'focus:outline-none focus:ring-1 focus:ring-offset-0',
            leftIcon && 'pl-12',
            rightIcon && 'pr-12',
            error
              ? 'border-red-500 focus:ring-red-400'
              : 'border-gray-300 focus:border-green focus:ring-green/50',
            disabled && 'opacity-60 cursor-not-allowed',
            className
          )}
        />

        {rightIcon && (
          <span
            className={clsx(
              'absolute right-4 top-1/2 -translate-y-1/2 flex items-center text-black',
              iconClassName,
              onIconClick ? 'cursor-pointer' : 'pointer-events-none'
            )}
            role={onIconClick ? 'button' : undefined}
            tabIndex={onIconClick ? 0 : undefined}
            aria-label={iconAriaLabel}
            onClick={onIconClick}
            onKeyDown={handleIconKeyDown}
          >
            {icon}
          </span>
        )}

        {typeof error === 'string' && (
          <p className="mt-1 text-xs font-medium text-red-600">
            {error}
          </p>
        )}
      </div>
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
