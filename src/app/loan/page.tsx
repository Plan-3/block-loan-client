'use client'
import React, { useState } from 'react'
import styles from '@/app/page.module.css'
import Image from 'next/image'
import citizen from '../../../CitizenLogoWhite.png'

function loan() {
  const [collateral, setCollateral] = useState(0)
  const handleChange = (e: any) => {
    setCollateral(Number(e.target.value))
  }

  return (
    <div>
      <h1><Image src={citizen} alt='citizen logo' height={50} width={50}></Image> Citizen</h1>
      <div >
        <div className={styles.main2}>
          <h3 className={styles.description}>Collateral</h3>
          <input type="text" name="denom" id="" placeholder='denom amount' onChange={(event) => handleChange(event)}/>
          <h3 className={styles.description}>Interest</h3>
          <p>6.00%</p>
          <h3 className={styles.description}>Loan Repayment</h3>
          <p>{(collateral + (collateral / 6)).toFixed(2)}</p>
          <h3 className={styles.description}>Days to repay</h3>
          {/* 30K blocks for default loan divided by 12343 the number of blocks mined in a day
           which is under the assumption that a block is mined every 7 seconds */}
          <p>{Math.round(37000 / 12343)}</p>
        </div>
        <button style={{padding: '1.7rem', margin: '2rem', fontSize: '1.4rem', backgroundColor: "black"}}>Request Loan</button>
      </div>
    </div>
  )
}

export default loan