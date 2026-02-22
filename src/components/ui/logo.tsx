import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  alt?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  useImage?: boolean;
};

export function Logo({
  className,
  alt = "XRP Tokyo",
  width,
  height,
  priority = false,
  useImage = true,
}: LogoProps) {
  const baseClassName = className || "";

  if (useImage && width && height) {
    return (
      <>
        <Image
          src="/logo-light.svg"
          alt={alt}
          width={width}
          height={height}
          className={cn("w-auto dark:hidden", baseClassName)}
          priority={priority}
        />
        <Image
          src="/logo-dark.svg"
          alt={alt}
          width={width}
          height={height}
          className={cn("hidden w-auto dark:block", baseClassName)}
          priority={priority}
        />
      </>
    );
  }

  return (
    <>
      <img
        src="/logo-light.svg"
        alt={alt}
        className={cn("w-auto dark:hidden", baseClassName)}
      />
      <img
        src="/logo-dark.svg"
        alt={alt}
        className={cn("hidden w-auto dark:block", baseClassName)}
      />
    </>
  );
}
