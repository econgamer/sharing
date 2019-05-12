const topImg = document.getElementById("top-img")
const mainImg = document.getElementById("main-img")
const cheeseImg = document.getElementById("cheese-img")
const vegImg = document.getElementById("veg-img")
const sauceImg = document.getElementById("sauce-img")
const addImg = document.getElementById("add-img")

const topTxt = document.getElementById("top-txt")
const mainTxt = document.getElementById("main-txt")
const cheeseTxt = document.getElementById("cheese-txt")
const vegTxt = document.getElementById("veg-txt")
const sauceTxt = document.getElementById("sauce-txt")
const addTxt = document.getElementById("add-txt")

const topImgTxt = ["意式香軟飽", "法式甜飽", "原塊生菜飽"];
const mainImgTxt = ["特厚原塊去皮雞腿", "100%安格斯牛肉", "大啡菇"];
const cheeseImgTxt = ["香軟水牛芝士", "經典車打芝士", "香辣芝士"];
const vegImgTxt = ["鮮蕃茄片", "原塊生菜", "清爽長酸瓜", "香炒洋蔥", "墨西哥小辣椒"];
const sauceImgTxt = ["松露風味醬", "墨西哥辣茄醬", "美式BBQ醬", "蛋黃醬", "芥末", "茄汁", "秘製Big Mac®醬"];
const addImgTxt = ["特厚原塊去皮雞腿", "100%安格斯牛肉", "大啡菇", "蘋果木燻脆煙肉", "牛油果蓉", "香烤蘑菇", "甜燒菠蘿", "嫩滑煎蛋"];

window.localStorage.trainingData = window.localStorage.trainingData || JSON.stringify([])


const currentBurger = {
  top: {},
  main: {},
  cheese: {},
  veg: {},
  sauce: {},
  add: {},
}

var burgerTobeSent = {};

generateRandomBurger()
predictThemeCombinations()

stars.forEach((star, i) => {
  const score = i / 4
  star.addEventListener("mouseenter", starsInit.bind(starsInit, i))
  star.addEventListener("mouseleave", clearStars)
  star.addEventListener("click", saveTrainingData.bind(saveTrainingData, score))
})

function saveTrainingData(score) {
  const data = JSON.parse(window.localStorage.trainingData)

  data.push({
    input: burgerTobeSent,

    output: {score:score}
  })

  console.log("saved data is equal to: ", data);

  window.localStorage.trainingData = JSON.stringify(data)

  burgerTobeSent = {};

  predictThemeCombinations()
  // clearStars()
  generateRandomBurger()
}

// once we have a good set of data, generate some color combinations!
function predictThemeCombinations() {
  const data = JSON.parse(window.localStorage.trainingData)
  if (!data.length) {
    return;
  }

  console.log("data is equal to: ", data);

  themes.innerHTML = ""
  // const net = new brain.NeuralNetwork({activation: "leaky-relu"});
  const net = new brain.NeuralNetwork();
  const results = []

  net.train(data)

  for (let i = 0; i < 100; i++) {

    const topValue = Math.round(Math.random() * 2 + 1);
    const mainValue = Math.round(Math.random() * 2 + 1);
    const cheeseValue = Math.round(Math.random() * 2 + 1);
    const vegValue = Math.round(Math.random() * 4 + 1);
    const sauceValue = Math.round(Math.random() * 6 + 1);
    const addValue = Math.round(Math.random() * 7 + 1);

    var burger = {};

    if(topValue == 1){
      burger.bread1 = 1;
    }else if(topValue == 2){
      burger.bread2 = 1;
    }else if(topValue == 3){
      burger.bread3 = 1;
    }

    if(mainValue == 1){
      burger.main1 = 1;
    }else if(mainValue == 2){
      burger.main2 = 1;
    }else if(mainValue == 3){
      burger.main3 = 1;
    }

    if(cheeseValue == 1){
      burger.cheese1 = 1;
    }else if(cheeseValue == 2){
      burger.cheese2 = 1;
    }else if(cheeseValue == 3){
      burger.cheese3 = 1;
    }

    if(vegValue == 1){
      burger.veg1 = 1;
    }else if(vegValue == 2){
      burger.veg2 = 1;
    }else if(vegValue == 3){
      burger.veg3 = 1;
    }else if(vegValue == 4){
      burger.veg4 = 1;
    }else if(vegValue == 5){
      burger.veg5 = 1;
    }

    if(sauceValue == 1){
      burger.sauce1 = 1;
    }else if(sauceValue == 2){
      burger.sauce2 = 1;
    }else if(sauceValue == 3){
      burger.sauce3 = 1;
    }else if(sauceValue == 4){
      burger.sauce4 = 1;
    }else if(sauceValue == 5){
      burger.sauce5 = 1;
    }else if(sauceValue == 6){
      burger.sauce6 = 1;
    }else if(sauceValue == 7){
      burger.sauce7 = 1;
    }

    if(addValue == 1){
      burger.add1 = 1;
    }else if(addValue == 2){
      burger.add2 = 1;
    }else if(addValue == 3){
      burger.add3 = 1;
    }else if(addValue == 4){
      burger.add4 = 1;
    }else if(addValue == 5){
      burger.add5 = 1;
    }else if(addValue == 6){
      burger.add6 = 1;
    }else if(addValue == 7){
      burger.add7 = 1;
    }else if(addValue == 8){
      burger.add7 = 1;
    }

    const result = net.run(burger)
    // console.log("burger result B: ", burger);
    // console.log("burger result R: ", result);
    results.push({ topValue, mainValue, cheeseValue, vegValue, sauceValue, addValue,  burger, result})


  }

  // sort results
  const sortedResults = results.sort(function(a, b) {
    var a = a.result.score
    var b = b.result.score

    return b - a
  })


  // keep the top 20 results!
  for (let i = 0; i < 6; i++) {
    addNewTheme(sortedResults[i])
  }
}

function addNewTheme(burger) {
  console.log("burger is equal to: ", burger);
  const newTheme = document.createElement("div")
  newTheme.classList.add("predicted-theme")
  newTheme.innerHTML = `
  <p>top: ${topImgTxt[burger.topValue - 1]}</p>
  <img src = "img/top/${burger.topValue}.jpg" />
  <p>top: ${burger.topValue}</p>

  <p>main: ${mainImgTxt[burger.mainValue - 1]}</p>
  <img src = "img/main/${burger.mainValue}.jpg" />
  <p>main: ${burger.mainValue}</p>

  <p>cheese: ${cheeseImgTxt[burger.cheeseValue - 1]}</p>
  <img src = "img/cheese/${burger.cheeseValue}.jpg" />
  <p>cheese: ${burger.cheeseValue}</p>

  <p>top: ${vegImgTxt[burger.vegValue - 1]}</p>
  <img src = "img/veg/${burger.vegValue}.jpg" />
  <p>top: ${burger.vegValue}</p>

  <p>top: ${sauceImgTxt[burger.sauceValue - 1]}</p>
  <img src = "img/sauce/${burger.sauceValue}.jpg" />
  <p>top: ${burger.sauceValue}</p>

  <p>top: ${addImgTxt[burger.addValue - 1]}</p>
  <img src = "img/add/${burger.addValue}.jpg" />
  <p>top: ${burger.addValue}</p>

  `
  themes.appendChild(newTheme);
}

function starsInit(whichStar) {
  for (let i = 0; i < stars.length; i++) {
    stars[i].classList.add("gold")
    if (i >= whichStar) {
      break;
    }
  }
}

function clearStars() {
  for (const star of stars) {
    star.classList.remove("gold")
  }
}

function generateRandomBurger(){
  currentBurger.top = Math.round(Math.random()*2 + 1);
  currentBurger.main = Math.round(Math.random()*2 + 1);
  currentBurger.cheese = Math.round(Math.random()*2 + 1);
  currentBurger.veg = Math.round(Math.random()*4 + 1);
  currentBurger.sauce = Math.round(Math.random()*6 + 1);
  currentBurger.add = Math.round(Math.random()*7 + 1);

  if(currentBurger.top == 1){
    burgerTobeSent.bread1 = 1;
  }else if(currentBurger.top == 2){
    burgerTobeSent.bread2 = 1;
  }else if(currentBurger.top == 3){
    burgerTobeSent.bread3 = 1;
  }

  if(currentBurger.main == 1){
    burgerTobeSent.main1 = 1;
  }else if(currentBurger.main == 2){
    burgerTobeSent.main2 = 1;
  }else if(currentBurger.main == 3){
    burgerTobeSent.main3 = 1;
  }

  if(currentBurger.cheese == 1){
    burgerTobeSent.cheese1 = 1;
  }else if(currentBurger.cheese == 2){
    burgerTobeSent.cheese2 = 1;
  }else if(currentBurger.cheese == 3){
    burgerTobeSent.cheese3 = 1;
  }

  if(currentBurger.veg == 1){
    burgerTobeSent.veg1 = 1;
  }else if(currentBurger.veg == 2){
    burgerTobeSent.veg2 = 1;
  }else if(currentBurger.veg == 3){
    burgerTobeSent.veg3 = 1;
  }else if(currentBurger.veg == 4){
    burgerTobeSent.veg4 = 1;
  }else if(currentBurger.veg == 5){
    burgerTobeSent.veg5 = 1;
  }

  if(currentBurger.sauce == 1){
    burgerTobeSent.sauce1 = 1;
  }else if(currentBurger.sauce == 2){
    burgerTobeSent.sauce2 = 1;
  }else if(currentBurger.sauce == 3){
    burgerTobeSent.sauce3 = 1;
  }else if(currentBurger.sauce == 4){
    burgerTobeSent.sauce4 = 1;
  }else if(currentBurger.sauce == 5){
    burgerTobeSent.sauce5 = 1;
  }else if(currentBurger.sauce == 6){
    burgerTobeSent.sauce6 = 1;
  }else if(currentBurger.sauce == 7){
    burgerTobeSent.sauce7 = 1;
  }

  if(currentBurger.add == 1){
    burgerTobeSent.add1 = 1;
  }else if(currentBurger.add == 2){
    burgerTobeSent.add2 = 1;
  }else if(currentBurger.add == 3){
    burgerTobeSent.add3 = 1;
  }else if(currentBurger.add == 4){
    burgerTobeSent.add4 = 1;
  }else if(currentBurger.add == 5){
    burgerTobeSent.add5 = 1;
  }else if(currentBurger.add == 6){
    burgerTobeSent.add6 = 1;
  }else if(currentBurger.add == 7){
    burgerTobeSent.add7 = 1;
  }else if(currentBurger.add == 8){
    burgerTobeSent.add7 = 1;
  }





  topImg.src = `img/top/${currentBurger.top}.jpg`;
  mainImg.src = `img/main/${currentBurger.main}.jpg`;
  cheeseImg.src = `img/cheese/${currentBurger.cheese}.jpg`;
  vegImg.src = `img/veg/${currentBurger.veg}.jpg`;
  sauceImg.src = `img/sauce/${currentBurger.sauce}.jpg`;
  addImg.src = `img/add/${currentBurger.add}.jpg`;

  topTxt.textContent = topImgTxt[currentBurger.top - 1];
  mainTxt.textContent = mainImgTxt[currentBurger.main - 1];
  cheeseTxt.textContent = cheeseImgTxt[currentBurger.cheese - 1];
  vegTxt.textContent = vegImgTxt[currentBurger.veg - 1];
  sauceTxt.textContent = sauceImgTxt[currentBurger.sauce - 1];
  addTxt.textContent = addImgTxt[currentBurger.add - 1];

  console.log("currentBurger", currentBurger)

  // var input = [
  //   Math.round(currentBurger.top/3 * 100) / 100, // divide by 255 and round to 2 decimal places
  //   Math.round(currentBurger.main/3 * 100) / 100,
  //   Math.round(currentBurger.cheese/3 * 100) / 100,
  //   Math.round(currentBurger.veg/5 * 100) / 100,
  //   Math.round(currentBurger.sauce/8 * 100) / 100,
  //   Math.round(currentBurger.add/8 * 100) / 100,
  // ];
  //
  // console.log("input is equal to: ", input);

}
