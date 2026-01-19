import React from 'react';
import { BG_CLASSES } from '../../utils/constants';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'primary' | 'secondary';
  noPadding?: boolean;
}

/**
 * Composant Card réutilisable pour standardiser les conteneurs
 */
export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  variant = 'secondary',
  noPadding = false 
}) => {
  const bgClass = variant === 'primary' ? BG_CLASSES.primary : BG_CLASSES.secondary;
  const paddingClass = noPadding ? '' : 'p-6';
  
  return (
    <div className={`${bgClass} ${paddingClass} rounded-xl border border-gray-800 ${className}`}>
      {children}
    </div>
  );
};

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Spinner de chargement réutilisable
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`animate-spin rounded-full border-t-2 border-b-2 border-blue-500 ${sizeClasses[size]} ${className}`}></div>
  );
};

interface LoadingScreenProps {
  message?: string;
}

/**
 * Écran de chargement pleine page
 */
export const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message = 'Chargement...' 
}) => {
  return (
    <div className={`min-h-screen ${BG_CLASSES.primary} flex flex-col items-center justify-center text-white`}>
      <LoadingSpinner size="lg" />
      <p className="mt-4 text-gray-400">{message}</p>
    </div>
  );
};

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
}

/**
 * État vide réutilisable
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  action,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      {icon && <div className="mb-4 opacity-30">{icon}</div>}
      <p className="text-xl font-medium text-gray-400">{title}</p>
      {description && <p className="text-sm mt-2 text-gray-500">{description}</p>}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
};

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

/**
 * Champ de formulaire réutilisable
 */
export const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="mb-6">
      {label && (
        <label className="block text-gray-300 text-sm font-medium mb-2">
          {label}
        </label>
      )}
      <input
        className={`w-full ${BG_CLASSES.primary} border ${error ? 'border-red-500' : 'border-gray-700'} rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none transition-colors ${className}`}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  fullWidth?: boolean;
  loading?: boolean;
}

/**
 * Bouton réutilisable
 */
export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  loading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'px-5 py-2 rounded-full font-bold transition-all duration-300 flex items-center justify-center gap-2';
  
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/30 hover:scale-105',
    secondary: 'bg-gray-700 hover:bg-gray-600 text-white',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
    ghost: 'bg-transparent hover:bg-white/10 text-white border border-gray-700',
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = (disabled || loading) ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass} ${disabledClass} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <LoadingSpinner size="sm" />}
      {children}
    </button>
  );
};
