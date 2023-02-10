import mongoose from 'mongoose';
<<<<<<< HEAD
const DBURI = 'mongodb+srv://sagar:sagar@cluster0.jcmbpaa.mongodb.net/test';
// mongodb+srv://sagar:sagar@cluster0.jcmbpaa.mongodb.net/?retryWrites=true&w=majority
=======
const DBURI = 'mongodb+srv://sagar:sagar@cluster0.jcmbpaa.mongodb.net/test
;
>>>>>>> fa99a7e2a2650be9db41920168758478d04c5fc2
const connectToMongo=()=>{
    
    mongoose
      .connect(DBURI)
      .then(res => console.log('connected successfully'))
      .catch(err => console.log('err====>', err));
}

export default connectToMongo
