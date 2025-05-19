import api from "../../utils/api";

const ActionType = {
    RECEIVE_USERS: 'RECEIVE_USERS',
};

function receiveUsersActionCreator(users) {
    return {
        type: ActionType.RECEIVE_USERS,
        payload: {
            users,
        },
    };
}

function asyncRegisterUser({id, name, password}){
    return async ()=>{
        try {
            await api.register({id, name, password});
            alert('Registration Succesful!');
        } catch (error) {
            alert(error.message);
        }
    };
}

function asyncReceiveUsers(){
    return async (dispatch)=> {
        try {
            const users = await api.getAllUsers();
            dispatch(receiveUsersActionCreator(users));
        } catch (error) {
            alert(error.message);
        }
    };
}

export {
    ActionType,
    asyncReceiveUsers,
    asyncRegisterUser,
    receiveUsersActionCreator,
}