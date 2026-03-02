import Link from "next/link";
import { Mail } from "lucide-react";

export default function NotFound() {
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-6">
            {/* Animated gradient background */}
            <div className="pointer-events-none absolute inset-0">
                <div className="absolute -left-1/4 -top-1/4 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px] animate-pulse-glow" />
                <div className="absolute -bottom-1/4 -right-1/4 h-[400px] w-[400px] rounded-full bg-primary-glow/10 blur-[120px] animate-pulse-glow [animation-delay:1s]" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center text-center">
                {/* 404 number */}
                <h1 className="text-[8rem] font-extrabold leading-none tracking-tighter md:text-[12rem]">
                    <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                        404
                    </span>
                </h1>

                {/* Message */}
                <h2 className="mt-2 text-2xl font-bold text-foreground md:text-3xl">
                    Page not found
                </h2>
                <p className="mt-3 max-w-md text-muted-foreground">
                    The page you&apos;re looking for doesn&apos;t exist or may have expired.
                    Temporary emails auto-delete after 1 hour.
                </p>

                {/* CTA */}
                <Link
                    href="/"
                    className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-primary to-primary-glow px-8 py-3 text-base font-semibold text-primary-foreground shadow-lg transition-all hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
                >
                    <Mail className="h-5 w-5" />
                    Back to Home
                </Link>
            </div>

            {/* Footer */}
            <footer className="absolute bottom-0 w-full border-t border-border py-6 text-center text-sm text-muted-foreground">
                © {new Date().getFullYear()} temp1mail.com — Free disposable email service
            </footer>
        </div>
    );
}
