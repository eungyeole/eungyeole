import {
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
  useEffectEvent,
} from "react";

export interface UseControllableStateProps<T> {
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
}

export function useControllableState<T>(props: UseControllableStateProps<T>) {
  const { value: valueProp, defaultValue, onChange } = props;

  const onChangeProp = useEffectEvent((e: T) => {
    onChange?.(e);
  });

  const [uncontrolledState, setUncontrolledState] = useState(defaultValue as T);

  const controlled = valueProp !== undefined;

  const value = controlled ? valueProp : uncontrolledState;

  const setValue: Dispatch<SetStateAction<T>> = useCallback(
    (next) => {
      const setter = next as (prevState?: T) => T;
      const nextValue = typeof next === "function" ? setter(value) : next;

      if (!controlled) {
        setUncontrolledState(nextValue);
      }

      onChangeProp(nextValue);
    },
    [controlled, value, onChangeProp]
  );

  return [value, setValue] as const;
}
