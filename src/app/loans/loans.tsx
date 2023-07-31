import React from 'react'
import { Loan }from '@/app/types/Loan'

function loans(loans: any) {
  const approveLoan = async (id: number) => {
    const result = await fetch(`http://localhost:8080/approveloan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({id: id})
    })
    const data = await result.json()
  }
  return (
    <div>
      {loans.props.map((loan: Loan) => (
          <div key={loan.id}>
            <p>Loan ID: {loan.id}</p>
            <p>Amount: {loan.amount}</p>
            {/* please look into cosmosclient in ignite github for querying block height */}
            <p>Fee: {loan.fee}</p>
            <p>Collateral: {loan.collateral}</p>
            <p>Deadline: {loan.deadline}</p>
            <p>Status: {loan.state}</p>
            <p>Borrower: {loan.borrower}</p>
            <button onClick={() => approveLoan(loan.id)}>Approve</button>
          </div>
          )
        )}
    </div>
  )
}

export default loans