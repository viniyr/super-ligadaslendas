import { InputHTMLAttributes, HTMLInputTypeAttribute, ReactNode } from "react";

export interface GenericInputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  disabled: boolean;
  propagateChange?: (change: any) => void;
  label?: string;
  initialValue?: string | number;
  inputNativeType?: HTMLInputTypeAttribute;
  icon?: ReactNode;
}

export interface DefaultInputProps extends GenericInputProps {
  inputSpecialType?: "CPF";
  icon?: ReactNode;
  customRef?: any;
  loading?: boolean;
}
export interface CurrencyInputProps extends GenericInputProps {
  unformattedValue: (value: any) => void;
}

interface Option {
  label: string;
  id: string;
}
export interface SelectInputProps extends GenericInputProps {
  options: Array<Option>;
}

export interface PercentageInputProps extends GenericInputProps {
  unformattedValue: (value: any) => void;
}
