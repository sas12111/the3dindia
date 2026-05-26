import React from 'react';

interface AuthButtonProps {
  children: React.ReactNode;
  type?: 'submit' | 'button';
  variant?: 'primary' | 'secondary' | 'social';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}

export function AuthButton({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  onClick,
  className = '',
  icon,
  fullWidth = false,
}: AuthButtonProps) {
  const isDisabled = disabled || loading;

  const sizeClasses = {
    sm: 'h-9 text-xs px-3',
    md: 'h-11 text-sm px-4',
    lg: 'h-12 text-base px-6',
  };

  const variantClasses = {
    primary:
      'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 focus:ring-blue-500/30',
    secondary:
      'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 font-medium focus:ring-blue-500/20',
    social:
      'bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300 font-medium focus:ring-blue-500/20 gap-2.5 justify-center',
  };

  const baseClasses = `
    rounded-lg transition-all duration-300
    flex items-center justify-center
    focus:outline-none focus:ring-2 focus:ring-offset-0
    disabled:opacity-60 disabled:cursor-not-allowed
    ${fullWidth ? 'w-full' : ''}
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={baseClasses}
    >
      {icon && !loading && <span className="flex-shrink-0">{icon}</span>}
      {loading && (
        <svg
          className="w-4 h-4 animate-spin mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
