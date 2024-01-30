import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  color: "primary" | "secondary" | "transparent" | "primaryAction";
  customStyle?: string;
  loading?: boolean;
}


export const Button = ({
  type,
  children,
  color,
  customStyle,
  onClick,
  loading,
}: ButtonProps) => {
  const colors = {
    primary:
      "bg-lol-slate bg-gradient-to-b from-black/25 to-black/25",
    primaryAction: "bg-lol-slate",
    secondary: "bg-[#97651e] text-white",
    transparent: "bg-transparent",
  };

  return (
    <button
      onClick={onClick}
      type={type}
      className={`h-8 lg:h-10 flex items-center justify-center rounded border-[1px] border-white border-opacity-5 uppercase px-2 text-sm font-semibold ${loading ? "pointer-events-none" : "pointer-events-auto"
        } ${colors[color]} ${customStyle}`}
      disabled={loading}
    >
      {loading ? <>Carregando...</> : children}
    </button>
  );
};

