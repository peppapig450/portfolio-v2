"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

interface BrowserContextType {
  isSafari: boolean;
}

const BrowserContext = createContext<BrowserContextType | undefined>(undefined);

interface BrowserContextProps {
  children: React.ReactNode;
}

export const BrowserProvider: React.FC<BrowserContextProps> = ({
  children,
}) => {
  const [isSafari, setIsSafari] = useState<boolean>(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    const isSafariBrowser =
      /^((?!chrome|android).)*safari/i.test(userAgent) &&
      !userAgent.includes("CriOS");
    setIsSafari(isSafariBrowser);
  }, []);

  return (
    <BrowserContext.Provider value={{ isSafari }}>
      {children}
    </BrowserContext.Provider>
  );
};

// Hook to use the context
export const useBrowser = (): BrowserContextType => {
  const context = useContext(BrowserContext);
  if (context === undefined) {
    throw new Error("useBrowser must be used within a BrowserProvider");
  }

  return context;
};
