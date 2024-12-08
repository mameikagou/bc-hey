"use client";

import { createContext, useMemo, useRef } from 'react';

interface SwapFormState {}

interface SwapFormContextState {
  // 是 React 中 useRef 钩子返回的对象类型之一。useRef 钩子用于创建一个可变的引用对象，该对象在组件的整个生命周期内保持不变。MutableRefObject 的主要特点是它的 .current 属性可以被更新，而不会触发组件重新渲染
  amountUpdatedTimeRef: React.MutableRefObject<number>;
}

export const SwapFormContext = createContext<SwapFormContextState | undefined>(
  undefined
);

export function SwapFormContextProvider({ children }) {
  const amountUpdatedTimeRef = useRef<number>(0);
  const state = useMemo(
    () => ({ amountUpdatedTimeRef }),
    [amountUpdatedTimeRef]
  );
  return (
    <SwapFormContext.Provider value={state}>
      {children}
    </SwapFormContext.Provider>
  );
}
