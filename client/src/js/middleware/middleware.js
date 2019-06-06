import { REGISTER } from '../constants/action-types';

export const getStateMiddleware = ({ dispatch, getState }) => {
    return function(next){
        return function(action){
            // do stuff
            if(action.type === REGISTER){
                console.log(this.state, 'register')
            }
            return next(action);
        }
    }
}