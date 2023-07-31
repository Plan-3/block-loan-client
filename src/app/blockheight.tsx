"use client"
import React, { useState, useEffect, createContext } from 'react'

export const BlockContext = createContext({})
let blockHeight: number = 0
const getBlock = async () => {
  const res = await fetch('http://localhost:8080/blockheight')
  const data = await res.json()
  blockHeight = data
  console.log(blockHeight)
}

getBlock()


export default function BlockHeight({ children }: any) {

  return (
    <BlockContext.Provider value={{ blockHeight }}>
      {children}
    </BlockContext.Provider>
  )
}
