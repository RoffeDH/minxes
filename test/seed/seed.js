const {ObjectID} = require('mongodb');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const accounts = [{
  _id: userOneId,
  username: 'userOne',
  password: 'userOnePass',
},{
  _id: userTwoId,
  username: 'userTwo',
  password: 'userTwoPass',
}];

module.exports = {accounts};
