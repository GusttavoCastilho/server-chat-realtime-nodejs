const users = [];

const addUser = ({ id, name, room, displayName }) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = users.find((user) => (user.room === room && user.name === name));

    if(existingUser) {
        return { error: 'Esse usuário já está sendo utilizado!' };
    }

    const addedUser = { id, name, displayName, room };
    users.push(addedUser);
    return { addedUser };
};  

const removeUser = (id) => {
    const index = users.findIndex((user) => (user.id === id));
    const removeUser = users.splice(index, 1)[0];
    return removeUser;
};

const getUser = (id) => (users.find((user) => user.id === id));

const getUsersInRoom = (room) => (users.filter(user => user.room === room));

module.exports = { addUser, removeUser, getUser, getUsersInRoom };