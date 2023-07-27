import React from 'react'

type Loan = {
  id?: number 
  amount: string
  fee: string
  collateral: string
  deadline: string
  state: string
  borrower: string 
}

function loans(loans: any) {
  console.log(loans)
  return (
    <div>
      {loans.props.map((loan: Loan) => (
          <div key={loan.id}>
            <p>Loan ID: {loan.id}</p>
            <p>Amount: {loan.amount}</p>
            <p>Fee: {loan.fee}</p>
            <p>Collateral: {loan.collateral}</p>
            <p>Deadline: {loan.deadline}</p>
            <p>Status: {loan.state}</p>
            <p>Borrower: {loan.borrower}</p>
          </div>
          )
        )}
    </div>
  )
}

export default loans