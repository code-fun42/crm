export class QueryApi {
  constructor(emitter) {
    // this.emitter = emitter;
    // this.path = "http://localhost:3000/api/clients";
  }

  // // стартовый метод, который вызывает метод нужного запроса
  // queryStart(queryData) {
  //   if (typeof Number(queryData) === "number") {
  //     // console.log('Ввели: ', queryData);
  //     const urlId = this.path + `/${queryData}`;
  //     this.queryGetId(urlId);
  //   }
  // }

  // // метод запрос поиска клиента по id
  // async queryGetId(url, method = "GET") {
  //   console.log(url);
  //   // const queryPath = "http://localhost:3000/api/clients?id=12345";
  //   const queryAPI = await fetch(url, {
  //     method: method,
  //     headers: {
  //       "Content-Type": "application/json;charset=utf-8",
  //     },
  //   }).then(async (data) => {
  //     const res = await data.json();
  //     const clientsArr = res !== [] ? res : false;
  //     // console.log(clientsArr);
  //     this.emitter.emit("onDownloadsClients", clientsArr);
  //   });
  // }

  async query(url, method = "GET") {
    let res = "";
    const queryAPI = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    }).then(async (data) => {
      res = await data.json();
      console.log(res);
    });
    return res;
  }
}
