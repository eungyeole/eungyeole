"use client";

import { Tabs as BaseTabs } from "@base-ui-components/react";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "./cn";
import { useIsClient } from "@/hooks/use-is-client";

interface AnimatedTabsContextValue {
  activeTab: string | undefined;
  containerRef: React.RefObject<HTMLDivElement | null>;
  activeTabElementRef: React.RefObject<HTMLButtonElement | null>;
}

const AnimatedTabsContext = createContext<AnimatedTabsContextValue | null>(
  null
);

const useAnimatedTabs = () => {
  const context = useContext(AnimatedTabsContext);
  if (!context) {
    throw new Error("useAnimatedTabs must be used within a AnimatedTabs.Root");
  }
  return context;
};

export const Tabs = ({
  children,
  defaultValue,
  value,
  onValueChange,
  ...props
}: BaseTabs.Root.Props) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const activeTab = value !== undefined ? value : internalValue;

  const containerRef = useRef<HTMLDivElement>(null);
  const activeTabElementRef = useRef<HTMLButtonElement>(null);

  const handleValueChange = (
    newValue: BaseTabs.Tab.Value,
    eventDetails: BaseTabs.Root.ChangeEventDetails
  ) => {
    setInternalValue(newValue);
    onValueChange?.(newValue, eventDetails);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (activeTab && container) {
      const activeTabElement = activeTabElementRef.current;
      if (activeTabElement) {
        const { offsetLeft, offsetWidth } = activeTabElement;
        const containerWidth = container.offsetWidth;

        if (containerWidth === 0) return;

        const clipLeft = (offsetLeft / containerWidth) * 100;
        const clipRight =
          100 - ((offsetLeft + offsetWidth) / containerWidth) * 100;

        container.style.clipPath = `inset(0 ${clipRight.toFixed(
          2
        )}% 0 ${clipLeft.toFixed(2)}% round 17px)`;
      }
    }
  }, [activeTab]);

  const contextValue = {
    activeTab,
    containerRef,
    activeTabElementRef,
  };

  return (
    <AnimatedTabsContext.Provider value={contextValue}>
      <BaseTabs.Root
        {...props}
        value={activeTab}
        onValueChange={handleValueChange}
        defaultValue={defaultValue}
      >
        {children}
      </BaseTabs.Root>
    </AnimatedTabsContext.Provider>
  );
};

export const TabsList = ({
  children,
  className,
  ...props
}: BaseTabs.List.Props) => {
  const isClient = useIsClient();
  const { containerRef } = useAnimatedTabs();

  return (
    <div className="relative w-fit">
      <BaseTabs.List className={cn("w-full flex", className)} {...props}>
        {children}
      </BaseTabs.List>
      <div
        aria-hidden
        ref={containerRef}
        inert
        className={cn(
          "absolute top-0 left-0 w-full h-full",
          "transition-all duration-300",
          isClient ? "opacity-100" : "opacity-0"
        )}
      >
        <BaseTabs.List
          className={cn(
            "w-full flex bg-emerald-950 rounded-[17px] text-white",
            className
          )}
        >
          {children}
        </BaseTabs.List>
      </div>
    </div>
  );
};

export const TabsTab = ({
  children,
  value,
  className,
  ...props
}: BaseTabs.Tab.Props) => {
  const { activeTab, activeTabElementRef } = useAnimatedTabs();
  const isActive = activeTab === value;

  return (
    <BaseTabs.Tab
      {...props}
      value={value}
      ref={isActive ? activeTabElementRef : null}
      className={cn(
        "cursor-pointer px-2 pr-2.5 py-1 font-medium text-sm flex items-center gap-1 [&_svg]:w-3 [&_svg]:h-3",
        className
      )}
    >
      {children}
    </BaseTabs.Tab>
  );
};
