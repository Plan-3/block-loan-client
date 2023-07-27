'use client'
import React, {useState, useEffect} from 'react'
import Loans from './loans'

type Loan = {
  id?: number 
  amount: string
  fee: string
  collateral: string
  deadline: string
  state: string
  borrower: string 
}
function page() {
  const [state, setState] = useState<Loan[]>([] as Loan[])

useEffect(() => {
  const fetchData = async () => {
    const result = await fetch(`http://localhost:8080/getloans`)
    const data = await result.json()
    data.Loan.forEach((loan: Loan, index: number) => {
      // Check if the loan has an id property, otherwise assign a default value (e.g., index + 1)
      // only the first loan is missing id property
      const loanWithId = loan.id ? loan : { id: index, ...loan};
      console.log("Adding loan to state:", loanWithId);
      setState((prevState) => [...prevState, loanWithId]);
    });
  }
  fetchData()
},[])
console.log("State:", state);
  return (
    <div>
      {(state.length === 0) ? 
        <div>Loading...</div> 
      : 
        <Loans props={state}/>
      }
      </div>
  )
}

export default page