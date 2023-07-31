export type Loan = {
  id?: number 
  amount: string
  fee: string
  collateral: string
  deadline: string
  state: string
  borrower: string 
}

export type ReqLoan = {
  Creator: string
  Amount: string
  Fee: string
  Collateral: string
  Deadline: string
}