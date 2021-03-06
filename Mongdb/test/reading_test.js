const assert = require("assert");
const User = require("../src/user");

describe("Reading users out of the database", () => {
  let joe, maria, alex, zach;

  beforeEach(done => {
    alex = new User({ name: 'alex' });
    joe = new User({ name: "joe" });
    maria = new User({ name: "maria" });
    zach = new User({ name: "zach" });

    Promise.all([alex.save(), joe.save(), maria.save(), zach.save()]).then(() => done());
  });

  it("it find all users with a name of joe", done => {
    User.find({ name: "joe" }).then(users => {
      assert(users[0]._id.toString() === joe._id.toString());
      done();
    });
  });

  it("find a user with a particular id", done => {
    User.findOne({ _id: joe._id }).then(user => {
      assert(user.name === "joe");
      done();
    });
  });

  it('can skip and limit the result set', (done) => {
    // -alex- [joe maria] zach
    User.find({})
      .sort(1)
      .skip(1)
      .limit(2)
      .then((users) => {
        assert(users.length === 2);
        assert(users[0].name === 'joe');
        assert(users[1].name === 'maria');
        done();
      })
  });
});
