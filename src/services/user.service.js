import Network from './network.service';

class UserService extends Network {

register(user){
    return this.send('PUT','/user',user)
}

login(email, password){
    return this.send('POST','/user/login', {email, password});
}

me(){
    return this.send('GET', '/user/me');
}

edit(id, user){
    return this.send('POST',`/user/${id}`,user);
}

}

export default new UserService();