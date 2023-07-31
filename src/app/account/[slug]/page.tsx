"use client"
import React, {useState, useEffect} from 'react'
import { Loan }from '@/app/types/Loan'
import loan from '@/app/loan/page'

function page({ params }: { params: { slug: string } }) {
  const [state, setState] = useState<Loan[]>([] as Loan[])
  let filtered: Loan[];
  let filterByState: Loan[];

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

  useEffect(() => {
    filtered = state.filter((loan) => loan.borrower === params.slug)
    filterByState = filtered.filter((loan) => loan.state === "liquidated")
    
  },[state])
  return (
    // @ts-ignore
    <div>{state.map((loan) => {
      if(loan.state == "cancelled" && loan.borrower != params.slug){
        return;
      }
      return (
        <div key={loan.id}>
          <h1>{loan.borrower}</h1>
        </div>
      )
    })}</div>
  )
}

export default page