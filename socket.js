const usersocketMap = {};

function savesockets(userId, socketId) {
    usersocketMap[userId] = socketId;
}

function getsockets(userId) {
    return usersocketMap[userId];
}
module.exports = { savesockets, getsockets };