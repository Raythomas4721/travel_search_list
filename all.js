// let data = [
//   {
//     id: 0,
//     name: "肥宅心碎賞櫻3日",
//     imgUrl:
//       "https://images.unsplash.com/photo-1522383225653-ed111181a951?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1655&q=80",
//     area: "高雄",
//     description: "賞櫻花最佳去處。肥宅不得不去的超讚景點！",
//     group: 87,
//     price: 1400,
//     rate: 10,
//   },
//   {
//     id: 1,
//     name: "貓空纜車雙程票",
//     imgUrl:
//       "https://images.unsplash.com/photo-1501393152198-34b240415948?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
//     area: "台北",
//     description:
//       "乘坐以透明強化玻璃為地板的「貓纜之眼」水晶車廂，享受騰雲駕霧遨遊天際之感",
//     group: 99,
//     price: 240,
//     rate: 2,
//   },
//   {
//     id: 2,
//     name: "台中谷關溫泉會1日",
//     imgUrl:
//       "https://images.unsplash.com/photo-1535530992830-e25d07cfa780?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80",
//     area: "台中",
//     description:
//       "全館客房均提供谷關無色無味之優質碳酸原湯，並取用八仙山之山冷泉供蒞臨貴賓沐浴及飲水使用。",
//     group: 20,
//     price: 1765,
//     rate: 7,
//   },
// ];
let data;
const url =
  "https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json";
axios
  .get(url)
  .then(function (res) {
    data = res.data.data;
    // init下面的卡片範圍
    const ticketCard_area = document.querySelector(".ticketCard-area");
    // searchResult number
    const searchResult = document.querySelector('#searchResult-text');
    
    function init() {
      let str = "";
      let searchResult_num = 0;
      data.forEach(function (item) {
        str += `<li class="ticketCard">
            <div class="ticketCard-img">
              <a href="#">
                <img src="${item.imgUrl}" alt="" />
              </a>
              <div class="ticketCard-region">${item.area}</div>
              <div class="ticketCard-rank">${item.rate}</div>
            </div>
            <div class="ticketCard-content">
              <div>
                <h3 class="ticketCard-name">${item.name}</h3>
                <p class="ticketCard-description">${item.description}</p>
              </div>
              <div class="ticketCard-info">
                <div class="ticketCard-num">
                  <p>
                    <i class="fas fa-exclamation-circle"></i></span>
                    剩下最後 <span id="ticketCard-num"> ${item.group} 組
                  </p>
                </div>
                <p class="ticketCard-price">
                  TWD <span id="ticketCard-price">$${item.price}</span>
                </p>
              </div>
            </div>
          </li>`;
        searchResult_num++;
      });
      ticketCard_area.innerHTML = str;
      searchResult.innerHTML = `本次搜尋共 ${searchResult_num} 筆資料`;
    }

    const ticketName = document.querySelector("#ticketName");
    const ticketImgUrl = document.querySelector("#ticketImgUrl");
    const ticketRegion = document.querySelector("#ticketRegion");
    const ticketPrice = document.querySelector("#ticketPrice");
    const ticketNum = document.querySelector("#ticketNum");
    const ticketRate = document.querySelector("#ticketRate");
    const ticketDescription = document.querySelector("#ticketDescription");
    const addTicket = document.querySelector(".addTicket-btn");

    function addData() {
      if (
        ticketName.value == "" ||
        ticketImgUrl.value == "" ||
        ticketRegion.value == "" ||
        ticketPrice.value == "" ||
        ticketNum.value == "" ||
        ticketRate.value == "" ||
        ticketDescription == ""
      ) {
        alert("欄位不得為空!");
        return;
      } else if (ticketRate.value < 1 || ticketRate.value > 10) {
        alert("數值必須在1~10之間!");
        return;
      } else {
        data.push({
          id: Date.now(),
          name: ticketName.value,
          imgUrl: ticketImgUrl.value,
          area: ticketRegion.value,
          description: ticketDescription.value,
          group: Number(ticketNum.value),
          price: Number(ticketPrice.value),
          rate: ticketRate.value,
        });
      }
    }
    addTicket.addEventListener("click", function (e) {
      addData();
      init();
      renderC3();
    });
    // 地圖搜尋
    const regionSearch = document.querySelector(".regionSearch");
    
    regionSearch.addEventListener("change", function (e) {
      if (e.target.value == undefined) {
        return;
      }
      let str = "";
      let searchResult_num = 0;
      data.forEach(function (item) {
        if (e.target.value === "") {
          str += `<li class="ticketCard">
            <div class="ticketCard-img">
              <a href="#">
                <img src="${item.imgUrl}" alt="" />
              </a>
              <div class="ticketCard-region">${item.area}</div>
              <div class="ticketCard-rank">${item.rate}</div>
            </div>
            <div class="ticketCard-content">
              <div>
                <h3 class="ticketCard-name">${item.name}</h3>
                <p class="ticketCard-description">${item.description}</p>
              </div>
              <div class="ticketCard-info">
                <div class="ticketCard-num">
                  <p>
                    <i class="fas fa-exclamation-circle"></i></span>
                    剩下最後 <span id="ticketCard-num"> ${item.group} 組
                  </p>
                </div>
                <p class="ticketCard-price">
                  TWD <span id="ticketCard-price">$${item.price}</span>
                </p>
              </div>
            </div>
          </li>`;
          searchResult_num++;
        } else if (e.target.value === item.area) {
          str += `<li class="ticketCard">
            <div class="ticketCard-img">
              <a href="#">
                <img src="${item.imgUrl}" alt="" />
              </a>
              <div class="ticketCard-region">${item.area}</div>
              <div class="ticketCard-rank">${item.rate}</div>
            </div>
            <div class="ticketCard-content">
              <div>
                <h3 class="ticketCard-name">${item.name}</h3>
                <p class="ticketCard-description">${item.description}</p>
              </div>
              <div class="ticketCard-info">
                <div class="ticketCard-num">
                  <p>
                    <i class="fas fa-exclamation-circle"></i></span>
                    剩下最後 <span id="ticketCard-num"> ${item.group} 組
                  </p>
                </div>
                <p class="ticketCard-price">
                  TWD <span id="ticketCard-price">$${item.price}</span>
                </p>
              </div>
            </div>
          </li>`;
          searchResult_num++;
        }
      });
      ticketCard_area.innerHTML = str;
      searchResult.innerHTML = `本次搜尋共 ${searchResult_num} 筆資料`;
    });
    // 執行
    init();
    renderC3();
  })
  .catch(function (err) {
    console.log(err.data);
  });

function renderC3() {
  let obj = [];
  data.forEach(function(item){
    if(obj[item.area]== undefined) {
      obj[item.area] = 1;
    } else {
      obj[item.area] ++;
    }
  })
  let newData = [];
  let area = Object.keys(obj);
  area.forEach(function(item) {
    let arr = [];
    arr.push(item);
    arr.push(obj[item]);
    newData.push(arr);
  })
  // C3
  let chart = c3.generate({
    bindto: '#chart', // HTML 元素綁定
    data: {
      columns: newData, // 資料存放
      type:"pie" // 圖表種類
    },
    size: {
      height: 200,
      width: 200
    },
    pie: {
      title: "地區"
    }
});
}
