"use client";

import { Logo } from "@/components/logo";
import { UserMenu } from "@/components/user-menu";
import { Button } from "@v1/ui/button";
import { Card, CardContent } from "@v1/ui/card";
import { cn } from "@v1/ui/cn";
import { ArrowLeftIcon, ArrowRightIcon, CheckCircle2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";

const steps = [
  { id: "pricing", label: "Choose Plan", path: "/onboarding" },
  { id: "complete", label: "Complete", path: "/onboarding/complete" },
];

interface OnboardingLayoutProps {
  children: ReactNode;
  showBackButton?: boolean;
  showNextButton?: boolean;
  nextButtonDisabled?: boolean;
  nextButtonLabel?: string;
  onNextClick?: () => void;
  onBackClick?: () => void;
  isNextLoading?: boolean;
  user: {
    id: string;
    email?: string | null;
    full_name?: string | null;
  };
}

export function OnboardingLayout({
  children,
  showBackButton = true,
  showNextButton = true,
  nextButtonDisabled = false,
  nextButtonLabel = "Continue",
  onNextClick,
  onBackClick,
  isNextLoading = false,
  user,
}: OnboardingLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();

  const currentStepIndex = steps.findIndex((step) => step.path === pathname);

  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else if (currentStepIndex > 0) {
      const prevStep = steps[currentStepIndex - 1];
      if (prevStep) {
        router.push(prevStep.path);
      }
    }
  };

  const handleNextClick = () => {
    if (onNextClick) {
      onNextClick();
    } else if (currentStepIndex < steps.length - 1) {
      const nextStep = steps[currentStepIndex + 1];
      if (nextStep) {
        router.push(nextStep.path);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/50 flex flex-col">
      <header className="border-sidebar-border border-si bg-sidebar">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Logo size="md" />
          <UserMenu user={user} />
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        {children}

        <div className="mt-6 max-w-3xl mx-auto flex justify-between">
          {showBackButton && currentStepIndex > 0 ? (
            <Button
              variant="outline"
              onClick={handleBackClick}
              className="flex items-center gap-2"
            >
              <ArrowLeftIcon className="h-4 w-4" />
              Back
            </Button>
          ) : (
            <div />
          )}
          {showNextButton && currentStepIndex < steps.length - 1 && (
            <Button
              onClick={handleNextClick}
              disabled={nextButtonDisabled || isNextLoading}
              className="flex items-center gap-2 min-w-[120px]"
            >
              {isNextLoading ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                  Loading...
                </span>
              ) : (
                <>
                  {nextButtonLabel}
                  <ArrowRightIcon className="h-4 w-4 ml-1" />
                </>
              )}
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}
