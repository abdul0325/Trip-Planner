import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { ReactNode } from "react";

interface GenericEmptyStateProps {
    title: string;
    description: string;
    link?: string;
    onClick?: () => void;
    linkLabel: string;
    icon?: ReactNode;
    className?: string;
    shouldShow: boolean;
}

const GenericEmptyState: React.FC<GenericEmptyStateProps> = ({
    title,
    description,
    link,
    linkLabel,
    icon,
    className = "",
    shouldShow,
    onClick
}) => {
    if (!shouldShow) return null;
    return (
        <div
            className={`w-full flex flex-col items-center justify-center text-center py-8 h-full px-6 ${className}`}
        >
            {icon && (
                <div className="mb-4 text-muted-foreground text-5xl">
                    {icon}
                </div>
            )}

            <h2 className="text-xl font-semibold mb-2">
                {title}
            </h2>

            <p className="text-sm text-muted-foreground max-w-md mb-6">
                {description}
            </p>

            {(link && !onClick) && (
                <Link href={link}>
                    <Button>
                        {linkLabel}
                    </Button>
                </Link>
            )}

            {(onClick && !link) && (
                <Button onClick={onClick}>
                    {linkLabel}
                </Button>
            )}
        </div>
    );
};

export default GenericEmptyState;