const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

before(done => {
  mongoose.connect("mongodb://localhost/user_test", {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  mongoose.connection
    .once("open", () => {
      done();
      console.log("******open******");
    })
    .on("error", error => console.warn("******Warning********", error));
});

beforeEach(done => {
  const { users, comments, blogposts } = mongoose.connection.collections;

  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        done();
      });
    });
  });
});

// beforeEach(done => {
//   mongoose.connection.collections.users.drop(() => {
//     // Ready to run the next test!
//     done();
//   });
// });

// //hook
// // => a hook is a function that will exicuted before any test exicuted inside of our test sweet.
// // beforeEach is a hook it will run before each test in out test sweet.

// //Remember...
// //When ever mongoose start to reach out to the mongo it take a little it of time.
// //the save exact idea applys to every single operation that we take on a collection as well. like reading, droping.
