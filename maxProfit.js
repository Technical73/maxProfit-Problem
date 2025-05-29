const maxProfit = (totalTime, buildings) => {
  const dp = Array.from({ length: totalTime + 1 }, () => ({
    profit: 0,
    T: 0,
    P: 0,
    C: 0,
  }));

  for (let t = 0; t <= totalTime; t++) {
    for (const b of buildings) {
      const finishTime = t + b.time;

      if (finishTime <= totalTime) {
        const remaining = totalTime - finishTime;
        const revenue = b.earning * remaining;

        const newProfit = dp[t].profit + revenue;

        if (newProfit > dp[finishTime].profit) {
          dp[finishTime] = { ...dp[t], profit: newProfit };
          dp[finishTime][b.name] += 1;
        }
      }
    }
  }

  return dp.reduce((a, b) => (a.profit > b.profit ? a : b));
};

const buildings = [
  { name: "T", time: 5, earning: 1500 },
  { name: "P", time: 4, earning: 1000 },
  { name: "C", time: 10, earning: 3000 },
];

const testCases = [7, 8, 13];

testCases.forEach((time, index) => {
  const result = maxProfit(time, buildings);
  console.log(`\nTest Case ${index + 1}`);
  console.log(`Time Unit: ${time}`);
  console.log(`Earnings: $${result.profit}`);
  console.log(`Buildings → T: ${result.T}, P: ${result.P}, C: ${result.C}`);
});
