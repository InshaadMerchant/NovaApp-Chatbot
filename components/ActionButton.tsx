interface ActionButtonProps {
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary'
}

export default function ActionButton({ label, onClick, variant = 'secondary' }: ActionButtonProps) {
  const baseClasses = "px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer"
  const variantClasses = variant === 'primary' 
    ? "bg-blue-500 text-white hover:bg-blue-600" 
    : "bg-gray-300 text-gray-800 hover:bg-gray-400"

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variantClasses}`}
    >
      {label}
    </button>
  )
} 