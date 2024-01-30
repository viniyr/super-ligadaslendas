'use client'

import { useState } from "react"
import { DefaultInputProps } from "./types";


export const Input = (
    {
        disabled,
        propagateChange,
        name,
        id,
        placeholder,
        label,
        initialValue,
        inputNativeType,
        inputSpecialType,
        required,
        value,
        icon,
        pattern,
        min,
        max,
        onFocus,
        onBlur,
        customRef,
        loading
    }: DefaultInputProps) => {

    const [storedValue, setStoredValue] = useState(initialValue ?? '');
    const [inputType, setInputType] = useState(inputNativeType ?? 'text')

    const globalChange = (e: any) => {

        setStoredValue(e.target.value)
        if (propagateChange) propagateChange(e.target.value)
    }

    return (
        <div className="w-full flex items-center justify-end relative border-solid border-lol-wine border-[0.5px] focus-within:border-secondary-color focus-within:border-[0.5px] rounded-[4px]">
            {icon && <div className="border-r-[0.5px] border-solid border-lol-wine rounded-l-[4px] z-[2] w-12 text-secondary-color flex items-center justify-center h-[50px] bg-transparent bg-gradient-to-b from-black/25 to-black/25">{loading ? '🔁' : icon}</div>}
            <input
                onBlur={onBlur}
                min={min}
                max={max}
                ref={customRef}
                pattern={pattern}
                autoComplete="new-password"
                name={name}
                id={id}
                onFocus={(e) => { if (onFocus) onFocus(e) }}
                onChange={(e) => globalChange(e)}
                value={value ?? storedValue}
                type={inputType}
                placeholder={placeholder}
                maxLength={inputSpecialType == 'CPF' ? 14 : 999999999}
                required={required}
                className="h-[50px] bg-transparent bg-gradient-to-b from-black/25 to-black/25 rounded-r-[4px] flex items-center justify-center w-full px-4 relative text-sm placeholder:text-white placeholder:text-[13px] placeholder:-ml-24 focus:border-0 focus:outline-none"
                disabled={disabled}
            >
            </input>
            {inputNativeType === 'password' &&
                <button
                    type="button"
                    onClick={() => setInputType(
                        () => {
                            if (inputType === 'password') return 'text'
                            if (inputType === 'text') return 'password'
                            return 'password'
                        }
                    )}
                    className="absolute top-3 right-4 text-white">{inputType == 'text' ? '🙉' : '🙈'}</button>
            }

        </div>
    )
}