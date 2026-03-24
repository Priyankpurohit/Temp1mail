import Link from "next/link";
import Image from "next/image";
import { Zap } from "lucide-react";

export function Logo() {
    return (
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Image
                src="/icon.svg"
                alt="Temp Mail Logo"
                width={36}
                height={36}
                className="w-9 h-9"
                priority
            />
            <span className="text-xl font-bold flex items-center text-foreground">
                Temp
                <Zap className="h-[2em] w-[1.2em] -mx-1 text-primary fill-primary scale-x-50 rotate-12" />
                Mail
            </span>
        </Link>
    );
}
