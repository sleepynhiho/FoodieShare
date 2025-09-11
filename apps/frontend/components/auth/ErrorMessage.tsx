import { CircleAlert } from "lucide-react";

export function ErrorMessage({ errorMessage }: { errorMessage: string }) {
    return (
        <span className="flex flex-row gap-2 items-center">
            <CircleAlert className="w-5 h-5 text-white" fill="red" />
            <p id="password-error" className="text-sm text-red-600">
                {errorMessage}
            </p>
        </span>
    )
}