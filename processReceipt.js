const data = require('./receipt.json');

console.clear();
const processReceipt = data => {
  const lineData = data.responses[0].textAnnotations[0].description;
  const receipt = lineData.split('\n');
  let priceArr = [];
  let itemsArr = [];
  let receiptObj = {};
  let parsedReceipt = [];
  const regex = /^\d*\.?\d*$/g;
  receipt.forEach(ele => {
    if (Number(ele)) {
      if (ele.match(regex)) {
        priceArr.push(Number(ele));
      }
    } else {
      itemsArr.push(ele);
    }
  });
  itemsArr.forEach((ele, idx) => {
    const lastSpaceIdx = ele.lastIndexOf(' ');
    if (ele.slice(-3).match(regex)) {
      priceArr.splice(
        idx,
        0,
        isNaN(Number(ele.slice(lastSpaceIdx + 1)))
          ? 999.99
          : Number(ele.slice(lastSpaceIdx + 1)),
      );
    }
  });
  priceArr.forEach((price, idx) => {
    receiptObj[idx] = {
      name: itemsArr[idx],
      price: price,
      quantity: 1,
    };
    parsedReceipt.push({
      name: itemsArr[idx],
      price: price,
      quantity: 1,
    });
  });

  return parsedReceipt;
};

console.log(processReceipt(data));
