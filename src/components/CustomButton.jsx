"use client";

const CustomButton = ({ btnType = "button", title, handleClick, styles = "", variant = "primary", disabled = false }) => {
  const base = "relative overflow-hidden font-semibold text-base px-6 py-3 rounded-full transition-smooth disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    primary:   "bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-glow-cyan hover:-translate-y-1 hover:scale-105",
    secondary: "bg-gradient-to-r from-secondary-500 to-secondary-600 text-white shadow-glow-purple hover:-translate-y-1 hover:scale-105",
    outline:   "bg-transparent border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white hover:shadow-glow-cyan hover:scale-105",
    ghost:     "bg-transparent text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover-scale",
    success:   "bg-gradient-to-r from-success-500 to-success-600 text-white hover:-translate-y-1 hover:scale-105",
    white:     "bg-white text-primary-600 hover:bg-gray-50 shadow-md hover:shadow-glow-cyan hover:scale-105",
  };
  return (
    <button type={btnType} disabled={disabled} className={`${base} ${variants[variant] ?? variants.primary} ${styles}`} onClick={handleClick}>
      <span className="relative z-10">{title}</span>
    </button>
  );
};

export default CustomButton;
