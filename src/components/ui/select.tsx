import * as React from "react"
import * as SelectPrimitive from "@headlessui/react"
import { Check, ChevronDown } from "lucide-react"
import { cn } from "@/utils/cn"

const Select = SelectPrimitive.Listbox

const SelectGroup = SelectPrimitive.Group

const SelectValue = SelectPrimitive.Button

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Button>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Button>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Button
    ref={ref}
    className={cn(
      "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  >
    {children}
    <ChevronDown className="h-4 w-4 opacity-50" />
  </SelectPrimitive.Button>
))
SelectTrigger.displayName = SelectPrimitive.Button.displayName

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Options>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Options>
>(({ className, children, position = "popper", ...props }, ref) => (
  <SelectPrimitive.Options
    ref={ref}
    className={cn(
      "relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      position === "popper" &&
        "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
      className
    )}
    {...props}
  >
    <div className="p-1">{children}</div>
  </SelectPrimitive.Options>
))
SelectContent.displayName = SelectPrimitive.Options.displayName

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
))
SelectLabel.displayName = SelectPrimitive.Label.displayName

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Option>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Option>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Option
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.Selected>
        <Check className="h-4 w-4" />
      </SelectPrimitive.Selected>
    </span>

    {children}
  </SelectPrimitive.Option>
))
SelectItem.displayName = SelectPrimitive.Option.displayName

const SelectSeparator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
))
SelectSeparator.displayName = "SelectSeparator"

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
}