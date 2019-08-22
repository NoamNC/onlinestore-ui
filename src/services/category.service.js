import Network from './network.service';

class CategoryService extends Network {

getAll(){
    return this.send('GET','/category')
    }
}

export default new CategoryService();