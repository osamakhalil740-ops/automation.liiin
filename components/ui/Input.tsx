import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export default function Input({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  id,
  ...props
}: InputProps) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  
  // Base input styles
  const baseStyles = 'px-4 py-3 bg-gray-50 border rounded-xl text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500';
  
  // State styles
  const stateStyles = error
    ? 'border-error-500 focus:border-error-500 focus:ring-error-500/20 text-error-900'
    : 'border-gray-200 focus:border-primary-500 focus:ring-primary-500/20 text-gray-900';
  
  // Icon padding adjustments
  const iconStyles = leftIcon ? 'pl-11' : rightIcon ? 'pr-11' : '';
  
  // Width
  const widthStyle = fullWidth ? 'w-full' : '';
  
  const combinedStyles = `${baseStyles} ${stateStyles} ${iconStyles} ${widthStyle} ${className}`;
  
  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {/* Label */}
      {label && (
        <label 
          htmlFor={inputId} 
          className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2"
        >
          {label}
        </label>
      )}
      
      {/* Input Container */}
      <div className="relative">
        {/* Left Icon */}
        {leftIcon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 flex items-center pointer-events-none">
            {leftIcon}
          </div>
        )}
        
        {/* Input Field */}
        <input
          id={inputId}
          className={combinedStyles}
          {...props}
        />
        
        {/* Right Icon */}
        {rightIcon && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 flex items-center pointer-events-none">
            {rightIcon}
          </div>
        )}
      </div>
      
      {/* Error Message */}
      {error && (
        <p className="mt-1.5 text-xs font-medium text-error-600 flex items-center gap-1">
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
      
      {/* Helper Text */}
      {!error && helperText && (
        <p className="mt-1.5 text-xs text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  );
}

// TextArea variant
export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
  showCharCount?: boolean;
  maxLength?: number;
}

export function TextArea({
  label,
  error,
  helperText,
  fullWidth = false,
  showCharCount = false,
  maxLength,
  className = '',
  id,
  value,
  ...props
}: TextAreaProps) {
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;
  const currentLength = value ? value.toString().length : 0;
  
  // Base textarea styles
  const baseStyles = 'px-4 py-3 bg-gray-50 border rounded-xl text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500 resize-y';
  
  // State styles
  const stateStyles = error
    ? 'border-error-500 focus:border-error-500 focus:ring-error-500/20 text-error-900'
    : 'border-gray-200 focus:border-primary-500 focus:ring-primary-500/20 text-gray-900';
  
  // Width
  const widthStyle = fullWidth ? 'w-full' : '';
  
  const combinedStyles = `${baseStyles} ${stateStyles} ${widthStyle} ${className}`;
  
  return (
    <div className={fullWidth ? 'w-full' : ''}>
      {/* Label */}
      {label && (
        <label 
          htmlFor={textareaId} 
          className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2"
        >
          {label}
        </label>
      )}
      
      {/* TextArea Field */}
      <textarea
        id={textareaId}
        className={combinedStyles}
        maxLength={maxLength}
        value={value}
        {...props}
      />
      
      {/* Error Message or Helper Text */}
      <div className="flex items-center justify-between mt-1.5">
        <div className="flex-1">
          {error && (
            <p className="text-xs font-medium text-error-600 flex items-center gap-1">
              <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </p>
          )}
          
          {!error && helperText && (
            <p className="text-xs text-gray-500">
              {helperText}
            </p>
          )}
        </div>
        
        {/* Character Count */}
        {showCharCount && maxLength && (
          <p className={`text-xs font-medium ml-2 ${
            currentLength > maxLength * 0.9 ? 'text-warning-600' : 'text-gray-500'
          }`}>
            {currentLength}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
}
