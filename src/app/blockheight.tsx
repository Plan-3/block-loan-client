"use client"
import React, { useState, useEffect, createContext } from 'react';

export const BlockContext = createContext({ blockHeight: 0 });

export function BlockHeightProvider({
  children,
}: {
  children: React.ReactNode
})  {
  const [blockHeight, setBlockHeight] = useState(0);

  useEffect(() => {
    const getBlock = async () => {
      const res = await fetch('http://localhost:8080/blockheight');
      const data = await res.json();
      setBlockHeight(data);
    };

    getBlock();
  }, []);

  return (
    <BlockContext.Provider value={{ blockHeight }}>
      {children}
    </BlockContext.Provider>
  );
}