class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFilter = ["page", "sort", "limit", "id"];
    excludedFilter.forEach((el) => delete queryObj[el]);

    if (queryObj.search) {
      queryObj.title = { $regex: queryObj.search, $options: "i" };
      delete queryObj.search;
    }

    if (this.queryString.sort === "sale") {
      this.query = this.query.find({ priceDiscount: { $gt: 0 } });
    } else {
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(
        /\b(gte|gt|lte|lt)\b/g,
        (match) => `$${match}`
      );

      this.query = this.query.find(JSON.parse(queryStr));
    }

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      let sortBy;

      // Map sort options to database fields
      switch (this.queryString.sort) {
        case "A-Z":
          sortBy = "title"; // Sort alphabetically by title
          break;
        case "Z-A":
          sortBy = "-title"; // Sort in reverse alphabetical order
          break;
        case "price-low":
          sortBy = "totalPrice"; // Sort by price ascending
          break;
        case "price-high":
          sortBy = "-totalPrice"; // Sort by price descending
          break;
        case "stock-low":
          sortBy = "totalAmount"; // Sort by stock ascending
          break;
        case "stock-high":
          sortBy = "-totalAmount"; // Sort by stock descending
          break;
        default:
          sortBy = "-createdAt"; // Default sorting by newest
      }

      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt"); // Default sorting
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1; // Default to page 1
    const limit = this.queryString.limit * 1 || 10; // Default to 10 results per page
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

export default APIFeatures;
