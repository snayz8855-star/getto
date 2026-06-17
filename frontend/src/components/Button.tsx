import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading = false, children, ...props }, ref) => {
    const variantClass = {
      primary: 'bg-indigo-600 hover:bg-indigo-700',
      secondary: 'bg-pink-600 hover:bg-pink-700',
      success: 'bg-green-600 hover:bg-green-700',
      danger: 'bg-red-600 hover:bg-red-700',
    }[variant]
    
    const sizeClass = {
      sm: 'px-3 py-1 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    }[size]
    
    return (
      <button
        ref={ref}
        {...props}
        disabled={loading || props.disabled}
        className={`text-white font-bold rounded-lg transition disabled:opacity-50 ${variantClass} ${sizeClass}`}
      >
        {loading ? '...' : children}
      </button>
    )
  }
)

Button.displayName = 'Button'
export default Button
