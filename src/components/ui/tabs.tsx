// AnimatedTabs.tsx
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

// 1. Context 생성
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

// 2. Root 컴포넌트: 상태와 로직 관리
interface RootProps extends BaseTabs.Root.Props {}

export const Tabs = ({
  children,
  defaultValue,
  value,
  onValueChange,
  ...props
}: RootProps) => {
  // 내부 상태를 관리하되, 제어 컴포넌트로도 사용할 수 있도록 value prop 처리
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

// 3. List 컴포넌트: 레이아웃과 오버레이 렌더링
interface ListProps extends BaseTabs.List.Props {}

export const TabsList = ({ children, className, ...props }: ListProps) => {
  const { containerRef } = useAnimatedTabs();

  return (
    <div className="relative w-fit">
      <BaseTabs.List className={cn("w-full flex", className)} {...props}>
        {children}
      </BaseTabs.List>
      <div
        aria-hidden
        ref={containerRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none transition-all duration-300"
      >
        <BaseTabs.List
          className={cn(
            "w-full flex bg-green-900 rounded-[17px] text-white",
            className
          )}
        >
          {children}
        </BaseTabs.List>
      </div>
    </div>
  );
};

// 4. Tab 컴포넌트: 개별 탭 정의
interface TabProps extends BaseTabs.Tab.Props {}

export const TabsTab = ({ children, value, className, ...props }: TabProps) => {
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
