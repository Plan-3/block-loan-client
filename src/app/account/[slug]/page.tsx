"use client"
import React, {useState, useEffect, useContext} from 'react'
import { Loan }from '@/app/types/Loan'
import loan from '@/app/loan/page'
import { BlockContext } from '@/app/blockheight'

function page({ params }: { params: { slug: string } }) {
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

  const {blockHeight} = useContext(BlockContext)

  const repayloan = async (loan: Loan) => {

    const l = {
      Creator: params.slug,
      Id: loan.id,
    }

    const result = await fetch(`http://localhost:8080/repayloan`, {
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
    // @ts-ignore
    <div>{state.map((loan) => {
      if(loan.state != "approved" || loan.borrower != params.slug){
        return;
      }
      return (
        <div key={loan.id}>
          <h1>{loan.borrower}</h1>
          <h2>{loan.amount}</h2>
          <h3>{loan.state}</h3>
          <h3>{loan.deadline}</h3>
          {(blockHeight < (Number(loan.deadline) + blockHeight)) ? <p onClick={() => repayloan(loan)}>Repay</p> : <p>Loan is past due and will be liquidated</p>}
        </div>
      )
    })}</div>
  )
}

export default page