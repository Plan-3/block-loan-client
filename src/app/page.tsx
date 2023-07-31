'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import citizen from '../../CitizenLogoWhite.png'
import styles from './page.module.css'

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
            <div className={styles.description}>{names[index]}:  {account.address}</div>
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