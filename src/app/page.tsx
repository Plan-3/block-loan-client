'use client'
import React, { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import citizen from '../../CitizenLogoWhite.png'
import styles from './page.module.css'
import { BlockContext } from './blockheight'

type Account = {
  address: string
  coins: Coin[]
}

type Coin = {
  denom: string
  amount: string
}

function page() {
  const [accounts, setAccounts] = useState<Account[]>([])
  const names: string[] = ['Alice', 'Bob', 'Carol']

  let block = useContext(BlockContext)
  console.log(block);
  

  useEffect(() => {
    const getGenesisData = async () => {
      const res = await fetch('http://0.0.0.0:26657/genesis?exported_loan.json')
      const data = await res.json()
      data.result.genesis.app_state.bank.balances.forEach(async (account: any) => {
        const res = await fetch(`http://localhost:8080/getaccounts/${account.address}`)
        
        const data = await res.json()
        console.log(data);
        
        let acc: Account = {
          address: account.address,
          coins: data
        }
        
        setAccounts((prevState) => [...prevState, acc])
      })
    }
    getGenesisData()
  }, [])

  console.log(accounts)

  return (
    <div>
      <h1>Citizen <Image src={citizen} alt='citizen logo' height={50} width={50}></Image></h1>
      <div className={styles.main}>
        {accounts.map((account, index) => (
          <div style={{border: "4px solid white", borderRadius: ".5rem", margin: "1rem"}} key={account.address}>
            <div className={styles.description}>{names[index]}: <Link href={`/account/${account.address}`}>{account.address}</Link></div>
            <div className={styles.description}>
              {account.coins.map((coin) => (
                <div key={coin.denom}>
                  {coin.denom}: {coin.amount}
                </div>
              ))}
            </div>
          </div>))}
      </div>
    </div>
  )
}

export default page