"use client"

import { useState, createContext, useContext, useEffect, type ReactNode, type ComponentProps } from "react"
import { cn } from "@/lib/utils"
import { ChevronDownIcon, CheckIcon, ChevronUpIcon } from "lucide-react"

interface SelectContextType {
  value?: string;
  onValueChange?: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedValueText?: string;
  setSelectedValueText: (text: string) => void;
  placeholder?: string;
}

const SelectContext = createContext<SelectContextType | null>(null);

export function Select({
  defaultValue,
  value: controlledValue,
  onValueChange,
  children,
}: {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
}) {
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [selectedValueText, setSelectedValueText] = useState("");

  const value = controlledValue !== undefined ? controlledValue : uncontrolledValue;
  const handleValueChange = (val: string) => {
    if (controlledValue === undefined) {
      setUncontrolledValue(val);
    }
    onValueChange?.(val);
    setOpen(false);
  };

  return (
    <SelectContext.Provider value={{ value, onValueChange: handleValueChange, open, setOpen, selectedValueText, setSelectedValueText }}>
      <div className="relative inline-block text-left w-full">
        {children}
      </div>
    </SelectContext.Provider>
  )
}

export function SelectGroup({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="select-group" className={cn("scroll-my-1 p-1", className)} {...props} />
}

export function SelectValue({ placeholder }: { placeholder?: string }) {
  const context = useContext(SelectContext);
  return <span data-slot="select-value">{context?.selectedValueText || context?.value || placeholder}</span>
}

export function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: ComponentProps<"button"> & { size?: "sm" | "default" }) {
  const context = useContext(SelectContext);
  return (
    <button
      type="button"
      data-slot="select-trigger"
      data-size={size}
      aria-expanded={context?.open}
      onClick={() => context?.setOpen(!context?.open)}
      className={cn(
        "flex w-full items-center justify-between gap-1.5 rounded-lg border border-input bg-transparent py-2 pr-2 pl-2.5 text-sm whitespace-nowrap transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-8 data-[size=sm]:h-7 dark:bg-input/30",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon className="pointer-events-none size-4 text-muted-foreground" />
    </button>
  )
}

export function SelectContent({ className, children, ...props }: ComponentProps<"div">) {
  const context = useContext(SelectContext);
  if (!context?.open) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={() => context.setOpen(false)} />
      <div
        data-slot="select-content"
        className={cn(
          "absolute left-0 mt-1 z-50 w-full min-w-[8rem] overflow-hidden rounded-lg bg-popover text-popover-foreground shadow-md ring-1 ring-foreground/10 animate-in fade-in-0 zoom-in-95",
          className
        )}
        {...props}
      >
        <div className="p-1">{children}</div>
      </div>
    </>
  )
}

export function SelectItem({
  value,
  children,
  className,
  ...props
}: ComponentProps<"div"> & { value: string }) {
  const context = useContext(SelectContext);
  const isSelected = context?.value === value;

  useEffect(() => {
    if (isSelected && typeof children === "string" && context) {
      context.setSelectedValueText(children);
    }
  }, [isSelected, children, context]);

  return (
    <div
      data-slot="select-item"
      onClick={() => context?.onValueChange?.(value)}
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pr-8 pl-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer",
        isSelected && "bg-accent/50 text-accent-foreground font-medium",
        className
      )}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        {isSelected && <CheckIcon className="size-4" />}
      </span>
      <span>{children}</span>
    </div>
  )
}

export function SelectLabel({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="select-label" className={cn("px-2 py-1.5 text-xs font-semibold text-muted-foreground", className)} {...props} />
}

export function SelectSeparator({ className, ...props }: ComponentProps<"div">) {
  return <div data-slot="select-separator" className={cn("-mx-1 my-1 h-px bg-muted", className)} {...props} />
}

export function SelectScrollUpButton({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex items-center justify-center py-1", className)} {...props}><ChevronUpIcon className="size-4" /></div>
}

export function SelectScrollDownButton({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex items-center justify-center py-1", className)} {...props}><ChevronDownIcon className="size-4" /></div>
}
