const maxProfit = (totalTime, buildings) => {
  const dp = Array.from({ length: totalTime + 1 }, () => ({
    profit: 0,
    T: 0,
    P: 0,
    C: 0,
  }));

  for (let t = 0; t <= totalTime; t++) {
    for (const b of buildings) {
      const finish = t + b.time;

      if (finish <= totalTime) {
        const operational = totalTime - finish;
        const revenue = operational * b.earning;
        const candidate = dp[t].profit + revenue;

        if (candidate > dp[finish].profit) {
          dp[finish] = { ...dp[t], profit: candidate };
          dp[finish][b.name] += 1;
        }
      }
    }
  }

  return dp.reduce((best, cur) => (cur.profit > best.profit ? cur : best));
};

const buildings = [
  { name: "T", time: 5, earning: 1500 },
  { name: "P", time: 4, earning: 1000 },
  { name: "C", time: 10, earning: 3000 },
];

const cases = [7, 8, 13];
cases.forEach((n, i) => {
  const r = maxProfit(n, buildings);
  console.log(`\nTest Case ${i + 1}`);
  console.log(`Time Unit: ${n}`);
  console.log(`Earnings: $${r.profit}`);
  console.log(`T: ${r.T}  P: ${r.P}  C: ${r.C}`);
});
