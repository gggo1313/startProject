// 1. 박스 2개 만들기
// 2. 드랍다운 리스트 만들기
// 3. 환율정보 들고오기
// 4. 드랍다운 리스트에서 아이템 선택하면 아이템이 바뀜
// 5. 금액을 입력하면 환전가격 표시
// 6. 드랍다운 리스트에서 아이템을 선택하면 해당 아이템 기준으로 금액 변경
// 7. 금액을 한국어로 표기
// 8. 밑에 박스에서 숫자를 바꿔도 위의 박스의 금액이 변경

let currencyRatio = {
  USD: {
    KRW: 1252.16,
    USD: 1,
    VND: 22984.5,
    unit: "달러",
  },
  KRW: {
    KRW: 1,
    USD: 0.0008,
    VND: 18.36,
    unit: "원",
  },
  VND: {
    KRW: 0.054,
    USD: 0.000044,
    VND: 1,
    unit: "동",
  },
};

// console.log(currencyRatio.VND.unit)
// console.log(currencyRatio['VND']['unit']);

var unitWords = ["", "만", "억", "조", "경"];
var splitUnit = 10000;
let toButton = document.getElementById("to-button");
let fromButton = document.getElementById("from-button");
let fromCurrency = "USD";
let toCurrency = "USD";

document.querySelectorAll("#from-currency-list a").forEach((menu) =>
  menu.addEventListener("click", function () {
    // 1. 버튼을 가져온다
    // document.getElementById("from-button")
    // 2. 버튼의 값을 바꾼다
    document.getElementById("from-button").textContent = this.textContent;
    // 3. 선택된 currency 값을 변수에 저장해준다
    fromCurrency = this.textContent;
    fromButton.innerHTML = `<img class="flag-img"src="${currencyRatio[fromCurrency].img}"/>${fromCurrency}`;
    convert('from');
  })
);

document.querySelectorAll("#to-currency-list a").forEach((menu) =>
  menu.addEventListener("click", function () {
    document.getElementById("to-button").textContent = this.textContent;
    toCurrency = this.textContent;
    toButton.innerHTML = `<img class="flag-img"src="${currencyRatio[toCurrency].img}"/>${toCurrency}`;
    convert('from');
  })
);

// 1. 키를 입력
// 2. 환전
// 3. 환전값 출력

function convert(type) {
  let amount = 0;
  if (type == "from") {
    // 입력값, from currency, to currency
    amount = document.getElementById("from-input").value;
    let convertedAmount = amount * currencyRatio[fromCurrency][toCurrency];

    document.getElementById("to-input").value = convertedAmount;
    renderKoreanNumber(amount, convertedAmount)
  } else {
    amount = document.getElementById("to-input").value;
    let convertedAmount = amount * currencyRatio[toCurrency][fromCurrency];

    document.getElementById("from-input").value = convertedAmount;
    renderKoreanNumber(convertedAmount, amount)
  }
}

function renderKoreanNumber(from, to) {
    document.getElementById("fromNumToKorea").textContent = 
        readNum(from) + currencyRatio[fromCurrency].unit;
    document.getElementById("toNumToKorea").textContent = 
        readNum(to) + currencyRatio[toCurrency].unit;
}

function readNum(num) {
    let resultString = "";
    let resultArray = [];
    for (let i = 0; i < unitWords.length; i++) {
        let unitResult = (num % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
        unitResult = Math.floor(unitResult);
        if (unitResult > 0) {
            resultArray[i] = unitResult;
        }
    }

    for (let i = 0; i < resultArray.length; i++) {
        if(!resultArray[i]) continue;
        resultString = String(resultArray[i]) + unitWords[i] + resultString;
    }

    return resultString;
  }