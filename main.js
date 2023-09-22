//core module
const http = require("http");
const url = require("url");
const fs = require("fs");
//my module
const replacetemp = require("./modules/replacetemp");

//trmplates
const productemp = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  "utf-8"
);
const overviewtemp = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  "utf-8"
);
const card_temp = fs.readFileSync(
  `${__dirname}/templates/card_temp.html`,
  "utf-8"
);

//json data
const jsondata = fs.readFileSync(`${__dirname}/dev-data/data.json`);
const data = JSON.parse(jsondata);
//server

const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  if (pathname === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const html = data.map((el) => replacetemp(el, card_temp)).join("");
    const output = overviewtemp.replace("{%PRODUCT_CARD%}", html);
    res.end(output);
  } else if (pathname == "/product") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    const output = replacetemp(data[query.id], productemp);
    res.end(output);
  } else {
    res.writeHead(404, {
      "Content-head": "text/html",
    });
    res.end("<h1>page is not found 404</h1>");
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("listening to server.....");
});
