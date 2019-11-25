import Network from './network.service';

class ProductService extends Network {

getByCategoryId(categoryId){
    return this.send('GET',`/category/${categoryId}/product`);
}

getById(productId){
    return this.send('GET', `/product/${productId}`);
}

getByIds(productIds){
    return this.send('POST', '/product/bulk', {ids: productIds});
}

create(product) {
    const data = new FormData();
    for(let prop in product){
        data.append(prop, product[prop]);
    }
   
    return this.sendMultipart('PUT', '/product', data);
}

getAll(){
    return this.send('GET', '/product');
}

edit(id, product){
    const data = new FormData();
    for (let prop in product) {
      data.append(prop, product[prop]);
    }
    return this.sendMultipart('POST',`/product/${id}`, data);
  }

  remove(id){
      return this.send('DELETE', `/product/${id}`);
  }

}

export default new ProductService();