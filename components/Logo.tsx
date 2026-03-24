import Link from "next/link";
import Image from "next/image";

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
            <span className="text-xl font-bold text-foreground">
                Temp Mail
            </span>
        </Link>
    );
}
