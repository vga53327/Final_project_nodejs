let runPromise = (someone, timer, success = true) => {
    console.log(`${someone} 開始跑開始`);
    return new Promise((resolve, reject) => {
      // 傳入 resolve 與 reject，表示資料成功與失敗
      if (success) {
        setTimeout(function () {
          // 3 秒時間後，透過 resolve 來表示完成
          resolve(`${someone} 跑 ${timer / 1000} 秒時間(fulfilled)`);
        }, timer);
      } else {
        // 回傳失敗
        reject(`${someone} 跌倒失敗(rejected)`)
      }
    });
  }
  
  // 此段函式並不會影響其它函示的執行
  runPromise('小明', 3000).then(someone => {
    console.log('小明', someone)
  });
  // 以下這段 console 會在 promise 結束前就執行
  console.log('這裡執行了一段 console');