import Network from './network.service';
import cookie from 'react-cookies';

class UserService extends Network {

getAll(){
    return this.send('GET','/user');
}

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


editMe(id, user){
    const data = new FormData();
    for (let prop in user) {
      data.append(prop, user[prop]);
    }
    return this.sendMultipart('POST',`/user/${id}`, data);
  }

isLogged(){
    if(cookie.load('user')){
        return true;
    }
    else {
       return false;
    }
}

}

export default new UserService();