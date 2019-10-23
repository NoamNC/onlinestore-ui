import Network from "./network.service";

class CategoryService extends Network {
  create(category) {
    const data = new FormData();
    for (let prop in category) {
      data.append(prop, category[prop]);
    }

    return this.sendMultipart("PUT", "/category", data);
  }

  getAll() {
    return this.send("GET", "/category");
  }
}

export default new CategoryService();
