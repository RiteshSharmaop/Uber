import mongoose from "mongoose"



const connectDB = async () => {
    try {
        // Connecrtion Issue --> Check this code and solve the bug
        const connectingInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}/${process.env.DB_NAME}`
        );
        console.log("aagya");
        
        // to check the host
        console.log(
            `\n MongoDB connected !! DB HOST 😎 ${connectingInstance.connection.host}`
        );
        
    } catch (error) {
        
        console.log("MONGODB connection Failed ", error);
        // different os process and code in nopdjs
        process.exit(1);
    }
};

export default connectDB;
