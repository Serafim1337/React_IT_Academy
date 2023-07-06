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
];

const shopName = "Furniture Shop";

ReactDOM.render(
  React.createElement(CatalogBlock, { listOfGoods, shopName }),
  document.querySelector("#container")
);
