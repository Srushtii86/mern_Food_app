const mongoose = require('mongoose');
const mongoURL = "mongodb+srv://gofood:gofood%40123456@cluster0.nunk5qq.mongodb.net/GoFoodMern?retryWrites=true&w=majority";

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
        const fetched_data = await mongoose.connection.db.collection("food_items");
        const data = await fetched_data.find({}).toArray();
        console.log();
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

module.exports = connectToMongoDB;
