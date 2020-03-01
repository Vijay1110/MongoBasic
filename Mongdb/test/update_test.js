const assert = require("assert");
const User = require("../src/user");

describe("Updating records", () => {
  let joe;

  beforeEach(done => {
    joe = new User({ name: "joe", likes: 0 });
    joe.save().then(() => done());
  });

  function assertName(operation) {
    operation;
  }

  it("instance type using set and save", done => {
    //set is use whenever we want to change the one of the property on an object.
    console.log(joe);
    joe.set("name", "Alex");
    joe
      .save()
      .then(() => User.find({}))
      .then(users => {
        assert(users.length === 1);
        assert(users[0].name === "Alex");
        done();
      });
  });

  it("A model instance can update", done => {
    joe
      .update({ name: "Alex" })
      .then(() => User.find({}))
      .then(users => {
        assert(users.length === 1);
        assert(users[0].name === "Alex");
        done();
      });
  });

  it("A model class can update", done => {
    User.update({ name: "joe" }, { name: "Alex" })
      .then(() => User.find({}))
      .then(users => {
        assert(users.length === 1);
        assert(users[0].name === "Alex");
        done();
      });
  });

  it("A model class can update one record", done => {
    User.findOneAndUpdate({ name: "joe" }, { name: "Alex" })
      .then(() => User.find({}))
      .then(users => {
        assert(users.length === 1);
        assert(users[0].name === "Alex");
        done();
      });
  });

  it("A model class can find a record with an Id and update", done => {
    User.findByIdAndUpdate(joe._id, { name: "Alex" })
      .then(() => User.find({}))
      .then(users => {
        assert(users.length === 1);
        assert(users[0].name === "Alex");
        done();
      });
  });

  it("A user can have their postcount incremented by 1", done => {
    User.update({ name: "joe" }, { $inc: { likes: 1 } })
      .then(() => User.findOne({ name: "joe" }))
      .then(user => {
        assert(user.likes === 1);
        done();
      });
  });
});
