const passport = require('passport');
const expect = require('expect');
const request = require('supertest');

const app = require('./../app');
const {accounts} = require('./seed/seed');
const Account = require('./../db/models/account');

before((done) => {
  Account.remove({}).then(() => {
    var accountOne = new Account({username: accounts[0].username, password: accounts[0].password});
    var accountTwo = new Account({username: accounts[1].username, password: accounts[1].password});

    accountOne.save((err) => {
      if (err) console.log('error', err.message);
    }).then(() => {
      accountTwo.save((err) => {
        if (err) console.log('error', err.message);
        done();
      })
    });
  });
});

describe('Register users', () => {
  it('should register a new user', (done) => {
    var username = 'Test1';
    var password = 'SomePassword';

    request(app)
      .post('/register')
      .send({username, password})
      .expect(302)
      .end((err, res) => {
        if(err) {
          return done(err);
        }

        Account.find({username}).then((users) => {
          expect(users.length).toBe(1);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not register a new user', (done) => {
    var username = 'Test2';
    var password;

    request(app)
      .post('/register')
      .send({username, password})
      .expect(200)
      .end((err, res) => {
        if(err) {
          return done(err);
        }

        Account.find().then((users) => {
          expect(users.length).toBe(3);
          done();
        }).catch((e) => done(e));
      });
  });
});

// describe('Edit user', () => {
//
// });
