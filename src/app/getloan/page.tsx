'use client'
import React, {useState, useEffect} from 'react'

type Loan = {
  id: number
  amount: string
  fee: string
  collateral: string
  deadline: string
  state: string
  borrower: string 
}
function page() {
  const [state, setState] = useState<Loan>({} as Loan)
  const [id, setId] = useState(0)

  const handleChange = (e: any) => {
    setId(Number(e.target.value))
  }

  const fetchData = async (number: number) => {
    const result = await fetch(`http://localhost:8080/getloan/${number}`)
    const data = await result.json()
    setState(data.Loan)
  }
  return (
    <div>
      <input type="text" name='id' onChange={(e) => handleChange(e)}/>
      <button onClick={() => fetchData(id)}>Get Loan</button>
      <div>
        {state != undefined ? ( 
          <div>
            <p>Loan ID: {state.id}</p>
            <p>Amount: {state.amount}</p>
            <p>Fee: {state.fee}</p>
            <p>Collateral: {state.collateral}</p>
            <p>Deadline: {state.deadline}</p>
            <p>Status: {state.state}</p>
            <p>Borrower: {state.borrower}</p>
          </div>
        ): "No Loan Found"
        }
      </div>
    </div>
  )
}

export default page