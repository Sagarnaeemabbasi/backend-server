import mongoose from 'mongoose';
const DBURI = 'mongodb+srv://sagar:sagar@cluster0.jcmbpaa.mongodb.net/test
;
const connectToMongo=()=>{
    
    mongoose
      .connect(DBURI)
      .then(res => console.log('connected successfully'))
      .catch(err => console.log('err====>', err));
}

export default connectToMongo
