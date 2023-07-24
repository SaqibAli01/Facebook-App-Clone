import mongoose from "mongoose";

const connectDatabase = () => {
    mongoose.set("strictQuery", true);
    mongoose.connect(process.env.MONGODB_URI)
        .then((c) => {
            console.log("________________________________________________________")
            console.log(`MongoDB Connected with server: ${c.connection.host}`);
            console.log("________________________________________________________")

        })
        .catch((e) => {
            console.log(e);
        });
};

export default connectDatabase;


// import mongoose from 'mongoose';

// const connectDatabase = () => {
//     const db = process.env.MONGODB_URI;
//     // const db = "mongodb+srv://saqib:saqib193@cluster0.c5yx5sw.mongodb.net/"
//     mongoose.connect(db, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     }).then(() => {
//         console.log(`-----------------------------------------------------------------------------`);
//         console.log(` MongoDB Connected with server ${mongoose.connection.host}`);
//         console.log(`-----------------------------------------------------------------------------`);
//     });
// };

// export default connectDatabase;
