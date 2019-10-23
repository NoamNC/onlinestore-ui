import development from './development';
import production from './production';

let env = development;
if(process.env.NODE_ENV=== 'production'){
    env= production;
}

export default env;