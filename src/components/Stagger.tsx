import { createContext, useContext, Children, type ReactNode } from "react";

const StaggerContext = createContext({ delay: 0, staggerStep: 0.1, index: 0 });

interface StaggerContainerProps {
  children: ReactNode;
  delay?: number;
  staggerStep?: number;
  className?: string;
}

export function StaggerContainer({
  children, delay = 0, staggerStep = 0.1, className = "",
}: StaggerContainerProps) {
  return (
    <div className={className}>
      {Children.map(children, (child, i) => (
        <StaggerContext.Provider value={{ delay, staggerStep, index: i }} key={i}>
          {child}
        </StaggerContext.Provider>
      ))}
    </div>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
}

export function StaggerItem({ children, className = "" }: StaggerItemProps) {
  const { delay, staggerStep, index } = useContext(StaggerContext);
  return (
    <div
      className={className}
      style={{ transitionDelay: `${delay + index * staggerStep}s` }}
    >
      {children}
    </div>
  );
}
