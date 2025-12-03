interface CheckoutStepperProps {
  currentStep: number
  steps: string[]
}

export default function CheckoutStepper({
  currentStep,
  steps,
}: CheckoutStepperProps) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              {/* Circle */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                  index < currentStep
                    ? "bg-green-600 text-white"
                    : index === currentStep
                      ? "bg-black text-white"
                      : "bg-gray-200 text-gray-500"
                }`}
              >
                {index < currentStep ? (
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              {/* Label */}
              <span
                className={`text-xs mt-2 font-medium ${
                  index <= currentStep ? "text-black" : "text-gray-400"
                }`}
              >
                {step}
              </span>
            </div>

            {/* Line connector */}
            {index < steps.length - 1 && (
              <div
                className={`h-0.5 flex-1 mx-2 mb-6 transition-colors ${
                  index < currentStep ? "bg-green-600" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
