const maxProfit = (time, buildings) => {
  const dp = [];

  for (let i = 0; i <= time; i++) {
    dp[i] = {
      profit: 0,
      T: 0,
      P: 0,
      C: 0,
    };
  }

  for (let t = 0; t <= time; t++) {
    for (let b of buildings) {
      if (t >= b.time) {
        const remainingTime = t - b.time;
        const prev = dp[remainingTime];
        const totalProfit = prev.profit + b.profit;

        if (totalProfit > dp[t].profit) {
          dp[t] = {
            profit: totalProfit,
            T: prev.T,
            P: prev.P,
            C: prev.C,
          };
          dp[t][b.name]++;
        }
      }
    }
  }

  return dp[time];
};

const buildings = [
  { name: "T", time: 5, profit: 1500 },
  { name: "P", time: 1, profit: 500 },
  { name: "C", time: 10, profit: 3000 },
];

const testCases = [{ timeUnits: 7 }, { timeUnits: 8 }, { timeUnits: 13 }];

testCases.forEach((testCase, index) => {
  const result = maxProfit(testCase.timeUnits, buildings);
  console.log(`Test Case ${index + 1}`);
  console.log(`Time Unit: ${testCase.timeUnits}`);
  console.log(`Earnings: $${result.profit}`);
  console.log(`Solutions`);
  console.log(`1. T: ${result.T} P: ${result.P} C: ${result.C}\n`);
});
