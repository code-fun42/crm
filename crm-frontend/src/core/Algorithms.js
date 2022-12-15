export class Algorithms {
  constructor() {}

  searchObjTree(obj) {
    let res = [];

    function loopBranchThree(branch) {
      for (let el of branch.childNodes) {
        if (el.tagName === "INPUT") {
          res.push(el);
        }
        if (el.childNodes.length > 1) {
          loopBranchThree(el);
        }
      }
    }

    for (let el of obj) {
      if (el.tagName === "INPUT") {
        res.push(el);
      }
      if (el.childNodes.length > 0) {
        loopBranchThree(el);
      }
    }
    return res;
  }
}
