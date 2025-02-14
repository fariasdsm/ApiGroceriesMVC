import mongoose from 'mongoose';
mongoose.connect("mongodb+srv://230389:devluvme@clusterluvme.fwvno.mongodb.net/groceries_db?retryWrites=true&w=majority&appName=ClusterLuvme")
.then((db)=>console.log('MongoDB Atlas is connected'))
.catch((error)=>console.log(error));
export default mongoose