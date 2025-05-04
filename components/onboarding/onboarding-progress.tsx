import { CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface OnboardingProgressProps {
  currentStep: number
}

export function OnboardingProgress({ currentStep }: OnboardingProgressProps) {
  const steps = [
    { id: 1, name: "Welcome" },
    { id: 2, name: "Add License" },
    { id: 3, name: "Whitelist URLs" },
    { id: 4, name: "Complete" },
  ]

  return (
    <div className="mb-8">
      <div className="relative flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold",
                currentStep >= step.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-muted-foreground/30 text-muted-foreground/70",
              )}
            >
              {currentStep > step.id ? <CheckCircle2 className="h-5 w-5" /> : step.id}
            </div>
            <span
              className={cn(
                "mt-2 text-xs font-medium",
                currentStep >= step.id ? "text-primary" : "text-muted-foreground/70",
              )}
            >
              {step.name}
            </span>
          </div>
        ))}
        <div className="absolute left-0 top-4 -z-10 h-[2px] w-full">
          <div className="h-full w-full bg-muted-foreground/30">
            <div
              className="h-full bg-primary transition-all duration-500"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
