import mongoose from 'mongoose';


export default (db: string) => {
  const connection =() => {
    mongoose
    .connect(db, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => console.log("mongoDB is connected"))
    .catch((err) => console.log(err));
  }
  connection();
  // mongoose.connection.on("disconnected", connect);
}
