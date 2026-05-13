import React from 'react';
import { motion, MotionProps } from 'motion/react';

interface ButtonProps extends MotionProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

const variantStyles = {
  primary: 'bg-[#0F6E56] text-white hover:bg-[#0D5544] shadow-lg',
  secondary: 'bg-[#BA7517] text-white hover:bg-[#A66B14] shadow-lg',
  outline: 'border-2 border-[#0F6E56] text-[#0F6E56] hover:bg-[#0F6E56]/5',
  ghost: 'text-[#0F6E56] hover:bg-[#0F6E56]/10'
};

const sizeStyles = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-6 py-3 text-base gap-2',
  lg: 'px-8 py-4 text-lg gap-2.5'
};

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  loading,
  disabled,
  onClick,
  className = '',
  ...motionProps
}: ButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center font-bold rounded-xl transition-all
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      whileHover={!disabled && !loading ? { scale: 1.05 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.95 } : {}}
      {...motionProps}
    >
      {loading ? (
        <>
          <motion.span
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            ⚙️
          </motion.span>
          Chargement...
        </>
      ) : (
        <>
          {icon}
          {children}
        </>
      )}
    </motion.button>
  );
}

export function IconButton({
  children,
  variant = 'ghost',
  size = 'md',
  loading,
  disabled,
  onClick,
  className = '',
  ...motionProps
}: Omit<ButtonProps, 'icon'>) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center rounded-lg transition-all
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantStyles[variant]}
        ${className}
      `}
      whileHover={!disabled && !loading ? { scale: 1.1 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.9 } : {}}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}

// Floating action button
export function FloatingButton({
  children,
  onClick,
  className = '',
  ...motionProps
}: Omit<ButtonProps, 'variant' | 'size'>) {
  return (
    <motion.button
      onClick={onClick}
      className={`
        fixed bottom-8 right-8 w-16 h-16 rounded-full
        bg-gradient-to-br from-[#0F6E56] to-[#1D9E75]
        text-white shadow-2xl flex items-center justify-center
        hover:shadow-3xl transition-shadow
        ${className}
      `}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      {...motionProps}
    >
      {children}
    </motion.button>
  );
}

// Loading spinner variant
export function LoadingButton({
  children,
  isLoading,
  ...props
}: ButtonProps & { isLoading?: boolean }) {
  return (
    <Button loading={isLoading} disabled={isLoading} {...props}>
      {children}
    </Button>
  );
}
