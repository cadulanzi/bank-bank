export const validateAccountNumber = (accountNumber: string): boolean => {
  return /^[0-9]{10}$/.test(accountNumber);
};
