import { createContext, FC, ReactNode, useContext, useState } from "react";
import { Toast } from "./Toast";
import ToastList from "./ToastList";

export interface ToastContextValue {
  addToast: (props: Toast) => void;
}

export const ToastContext = createContext<ToastContextValue>({
  addToast: () => {},
});

export interface ToastProviderProps {
  children: ReactNode;
}
export const ToastProvider: FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Toast) => {
    const id = toast.id || Math.random().toString(36).substring(7);

    setToasts((prevToasts) => [...prevToasts, { ...toast, id }]);

    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((t) => t.id !== id));
    }, toast.duration || 5000);
  };

  return (
    <ToastContext.Provider
      value={{
        addToast,
      }}
    >
      {children}
      <ToastList toasts={toasts} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);

  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
};
