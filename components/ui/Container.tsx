import { cn } from "@/lib/cn";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export default function Container({ children, className, id }: ContainerProps) {
  return (
    <section
      id={id}
      className={cn("px-20 py-20 w-full", className)}
    >
      {children}
    </section>
  );
}
