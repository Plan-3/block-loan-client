'use client'
import React, { useState } from 'react'
import styles from '@/app/page.module.css'
import Image from 'next/image'
import citizen from '../../../CitizenLogoWhite.png'
import { ReqLoan } from '@/app/types/Loan'

function loan() {
  const [collateral, setCollateral] = useState(0)
  const [loan, setLoan] = useState<ReqLoan>({} as ReqLoan)

  const handleChange = (e: any) => {
    let name = e.target.name
    setLoan({ ...loan, [name]: e.target.value })
    setCollateral(Number(e.target.value))
  }
  const formLoan = async () => {
    let l: ReqLoan = {
      Creator: loan.Creator,
      Amount: loan.Amount + "zusd",
      Fee: (Number(loan.Amount) / 7).toFixed(2) + "zusd",
      Collateral: loan.Collateral,
      Deadline: "37000",
    }
    console.log(l)
    const result = await fetch(`http://localhost:8080/requestloan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(l)
    })
    const data = await result.json()
    console.log(data)
  }

  return (
    <div>
      <h1><Image src={citizen} alt='citizen logo' height={50} width={50}></Image> Citizen</h1>
      <div >
        <div className={styles.main2}>
          <h3 className={styles.description}>Your address</h3>
          <input type="text" name="Creator" id="addr" onChange={(event) => handleChange(event)} />
          <h3 className={styles.description} >ZUSD to Borrow</h3>
          <input type="text" name="Amount" id="amt" onChange={(event) => handleChange(event)} />
          <h3 className={styles.description}>Collateral</h3>
          <input type="text" name="Collateral" id="dn" placeholder='denom amount' onChange={(event) => {
            handleChange(event)
            let amt = event.target.value.split("c")
            console.log(amt)
            setCollateral(Number(amt[0]))
          }} />
          <h3 className={styles.description}>Fee</h3>
          {loan.Amount ? (Number(loan.Amount) / 7).toFixed(2) : 0}
          <h3 className={styles.description}>Loan Repayment</h3>
          <p>{(collateral + (collateral / 7)).toFixed(2)}</p>
          <h3 className={styles.description}>Days to repay</h3>
          {/* 30K blocks for default loan divided by 12343 the number of blocks mined in a day
           which is under the assumption that a block is mined every 7 seconds */}
          <p>{Math.round(37000 / 12343)}</p>
        </div>
        <button style={{ padding: '1.7rem', margin: '2rem', fontSize: '1.4rem', backgroundColor: "black" }} onClick={() => formLoan()}>Request Loan</button>
      </div>
    </div>
  )
}

export default loan