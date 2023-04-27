export interface LoadBudgetRequest {

  id: number;

  amount: number;

  reason: string;

  // name of the department
  department: string;

  // full name of the user
  user: string;

}
