import { formatCurrency } from "../scripts/utils/money.js";

console.log("Test Suite: formatCurrency()");

console.log("Test: Converts cents to dollars");

if (formatCurrency(2095) === "$20.95") {
  console.log("Test Passed");
} else {
  console.log("Test Failed");
}

console.log("Test: Handles zero amount");

if (formatCurrency(0) === "$0.00") {
  console.log("Test Passed");
} else {
  console.log("Test Failed");
}

console.log("Test: Rounds decimal cents up");

if (formatCurrency(2000.5) === "$20.01") {
  console.log("Test Passed");
} else {
  console.log("Test Failed");
}

console.log("Test: Rounds decimal cents down");

if (formatCurrency(2000.4) === "$20.00") {
  console.log("Test Passed");
} else {
  console.log("Test Failed");
}