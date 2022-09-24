class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? { name: { $regex: this.queryStr.keyword, $options: "i" } }
      : {};

    //console.log(keyword);
    this.query = this.query.find({ ...keyword });
    return this;
  }

  search1() {
    const provided = this.queryStr.keyword;

    const keyword = this.queryStr.keyword
      ? {
          //$where: date.toJSON().slice(0, 10) == this.queryStr.keyword,
          //date: new Date(this.queryStr.keyword),
          date: {
            $gte: this.queryStr.keyword,
            $lte: this.queryStr.keyword + "T23:59:59",
          },
        }
      : {};

    //console.log(keyword);
    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    const queryCopy = this.queryStr;
    //console.log(queryCopy);
    const rm = ["keyword", "limit", "page"];
    rm.forEach((e) => delete queryCopy[e]);
    //console.log(queryCopy);
    this.query = this.query.find(queryCopy);
    return this;
  }

  pagination(resPerPage) {
    const currentPage = Number(this.queryStr.nam) || 1;
    //console.log(currentPage);
    const skip = resPerPage * (currentPage - 1);

    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }
}

module.exports = ApiFeatures;
