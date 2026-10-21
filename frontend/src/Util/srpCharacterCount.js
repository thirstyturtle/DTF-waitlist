// SRP character count calculation utility
// Based on the payment tables in backend/src/data/srp.rs

const DAILY_PAYMENTS = [
  { amount: 20, characters: 1 },
  { amount: 35, characters: 2 },
  { amount: 45, characters: 3 },
  { amount: 50, characters: 4 },
  { amount: 55, characters: 5 },
  { amount: 60, characters: 6 },
  { amount: 65, characters: 7 },
  { amount: 70, characters: 8 },
  { amount: 75, characters: 9 },
  { amount: 80, characters: 10 },
  { amount: 85, characters: 11 },
  { amount: 90, characters: 12 },
  { amount: 95, characters: 13 },
];

const PER_FOCUS_PAYMENTS = [
  { amount: 100, characters: 1 },
  { amount: 175, characters: 2 },
  { amount: 225, characters: 3 },
  { amount: 250, characters: 4 },
  { amount: 275, characters: 5 },
  { amount: 300, characters: 6 },
  { amount: 325, characters: 7 },
  { amount: 350, characters: 8 },
  { amount: 375, characters: 9 },
  { amount: 400, characters: 10 },
  { amount: 425, characters: 11 },
  { amount: 450, characters: 12 },
  { amount: 475, characters: 13 },
  { amount: 500, characters: 14 },
  { amount: 525, characters: 15 },
  { amount: 550, characters: 16 },
  { amount: 575, characters: 17 },
  { amount: 600, characters: 18 },
  { amount: 625, characters: 19 },
  { amount: 650, characters: 20 }
];

/**
 * Calculate the number of characters covered by an SRP payment
 * @param {number} paymentAmount - Payment amount in ISK (not millions)
 * @param {string} coverageType - Either "daily" or "per_focus"
 * @returns {number} Number of characters covered, or 0 if not a valid SRP payment
 */
export function getCharacterCount(paymentAmount, coverageType) {
  // Convert from ISK to millions for comparison
  const amountInMillions = paymentAmount / 1_000_000;
  
  // Use appropriate payment table based on coverage type
  const paymentTable = coverageType === "per_focus" ? PER_FOCUS_PAYMENTS : DAILY_PAYMENTS;
  
  // Find matching payment amount (with small tolerance for floating point precision)
  const matchingPayment = paymentTable.find(payment => 
    Math.abs(payment.amount - amountInMillions) < 0.01
  );
  
  return matchingPayment ? matchingPayment.characters : 0;
}

/**
 * Get character count display text
 * @param {number} paymentAmount - Payment amount in ISK
 * @param {string} coverageType - Either "daily" or "per_focus"
 * @returns {string} Display text for character count
 */
export function getCharacterCountText(paymentAmount, coverageType) {
  const count = getCharacterCount(paymentAmount, coverageType);
  
  if (count === 0) {
    return "Unknown";
  } else if (count === 1) {
    return "1 character";
  } else {
    return `${count} characters`;
  }
}
