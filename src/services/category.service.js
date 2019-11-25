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

  getById(categoryId){
    return this.send('GET',`/category/${categoryId}`);
}

  edit(id, category){
    const data = new FormData();
    for (let prop in category) {
      data.append(prop, category[prop]);
    }
    return this.sendMultipart('POST',`/category/${id}`, data);
  }

  remove(id){
    return this.send('DELETE', `/category/${id}`);
}

}

export default new CategoryService();
