"use client";

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

interface GlobalErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
    useEffect(() => {
        // Log to your error reporting service here
        console.error(error);
    }, [error]);

    return (
        <html>
            <body>
                <div className="min-h-screen w-full flex flex-col items-center justify-center text-center py-8 px-6 bg-background text-foreground">
                    {/* Icon */}
                    <div className="mb-4 text-muted-foreground text-5xl select-none">
                        ⚠️
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-semibold mb-2">
                        Something went wrong
                    </h2>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground max-w-md mb-6">
                        An unexpected error occurred. Our team has been notified.
                        You can try again or return to the home page.
                        {error?.digest && (
                            <span className="block mt-2 font-mono text-xs opacity-50">
                                Error ID: {error.digest}
                            </span>
                        )}
                    </p>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Button onClick={reset}>
                            Try again
                        </Button>
                        <Button variant="outline" onClick={() => (window.location.href = "/")}>
                            Go home
                        </Button>
                    </div>
                </div>
            </body>
        </html>
    );
}