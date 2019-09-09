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

}

export default new ProductService();