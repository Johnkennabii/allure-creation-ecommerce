import React from "react"

export type ButtonVariant = "primary" | "secondary" | "link"
export type ButtonSize = "small" | "medium" | "large"

export interface ButtonPronoviasProps {
  children: React.ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  type?: "button" | "submit" | "reset"
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  className?: string
}

export default function ButtonPronovias({
  children,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  fullWidth = false,
  type = "button",
  onClick,
  className = "",
}: ButtonPronoviasProps) {
  // Base classes - minimaliste Pronovias
  const baseClasses = "inline-flex items-center justify-center font-medium uppercase transition-all duration-250 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pronovias-black disabled:opacity-50 disabled:cursor-not-allowed"

  // Variant classes
  const variantClasses = {
    primary: "bg-pronovias-black text-pronovias-white hover:bg-gray-900 active:scale-[0.98]",
    secondary: "bg-transparent text-pronovias-black border border-pronovias-black hover:bg-pronovias-black hover:text-pronovias-white active:scale-[0.98]",
    link: "bg-transparent text-pronovias-black hover:opacity-70 underline-offset-4 hover:underline",
  }

  // Size classes
  const sizeClasses = {
    small: variant === "link" ? "text-xs tracking-wide px-2 py-1" : "text-xs tracking-widest px-4 py-2 min-h-[2.5rem]",
    medium: variant === "link" ? "text-sm tracking-wide px-3 py-2" : "text-xs tracking-widest px-8 py-4 min-h-[3.5rem]",
    large: variant === "link" ? "text-base tracking-wide px-4 py-3" : "text-sm tracking-widest px-10 py-5 min-h-[4rem]",
  }

  // Width classes
  const widthClasses = fullWidth ? "w-full" : ""

  // Loading classes
  const loadingClasses = loading ? "cursor-wait" : ""

  // Combine all classes
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClasses} ${loadingClasses} ${className}`

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={combinedClasses}
      aria-busy={loading}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-3 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Chargement...</span>
        </>
      ) : (
        children
      )}
    </button>
  )
}
