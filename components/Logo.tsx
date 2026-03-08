import Link from "next/link";
import { Mail, Zap } from "lucide-react";

export function Logo() {
    return (
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Mail className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold flex items-center text-foreground">
                Temp
                <Zap className="h-[2.5em] w-[1.7em] -mx-1 text-primary fill-primary scale-x-50 rotate-12" />
                Mail
            </span>
        </Link>
    );
}
