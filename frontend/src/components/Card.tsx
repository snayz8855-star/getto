import React from 'react'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ children, className = '', ...props }, ref) => {
    return (
      <div
        ref={ref}
        {...props}
        className={`bg-gray-800 rounded-lg p-4 border border-gray-700 ${className}`}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'

export default Card
