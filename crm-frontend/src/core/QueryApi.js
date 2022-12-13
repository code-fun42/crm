export class QueryApi {
  constructor() {
  }

  async query(url, method = "GET") {
    let res = ''
    const queryAPI = await fetch(url, {
      method: method,
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    }).then(async (data) => {
      res = await data.json();
      console.log(res);
    });
    return res
  }
}
