const listOfGoods = [
  {
    gId: 101,
    gName: "Стол",
    gPrice: 100,
    imageURL:
      "https://content.nebo.by/photos/mebel/big/webp/43601-58502-kompyuternye-stoly.webp",
    gRemains: 24,
  },
  {
    gId: 102,
    gName: "Стул",
    gPrice: 200,
    imageURL:
      "https://pinskdrev.by/web/catalogfiles/catalog/offers/Styl_Kontur_614_tabak.jpg",
    gRemains: 54,
  },
  {
    gId: 103,
    gName: "Шкаф",
    gPrice: 300,
    imageURL:
      "https://gomeldrev.by/wp-content/uploads/2022/06/2-shkafa-copy01.jpg",
    gRemains: 75,
  },
  {
    gId: 104,
    gName: "Диван",
    gPrice: 400,
    imageURL:
      "https://cdn0.divan.by/img/v1/RxQLlqQTW-905eduptwpPnWl0NsH0BB6Q2tU5hkb-tc/t:0::0:0/pd:60:60:60:60/rs:fit:1148:720:0:1:ce:0:0/g:ce:0:0/bg:f5f3f1/q:95/czM6Ly9kaXZhbi9wcm9kdWN0LzQ0MDUxMzcucG5n.jpg",
    gRemains: 95,
  },
  {
    gId: 105,
    gName: "Кровать",
    gPrice: 500,
    imageURL:
      "https://ir.ozone.ru/s3/multimedia-5/c1000/6380344757.jpg",
    gRemains: 35,
  },
];

const shopName = "Furniture Shop";

ReactDOM.render(
  React.createElement(CatalogBlock, { listOfGoods, shopName }),
  document.querySelector("#container")
);
