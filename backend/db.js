const mongoose = require('mongoose');

//If you are connecting to atlas
//const mongoURL = "mongodb+srv://gofood:gofood%40123456@cluster0.nunk5qq.mongodb.net/GoFoodMern?retryWrites=true&w=majority";
const mongoURL = "mongodb://127.0.0.1:27017/gofood";

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(mongoURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");

        const foodItemSchema = new mongoose.Schema({
            CategoryName: { type: String, required: true },
            name: { type: String, required: true },
            img: { type: String, required: true },
            options: { type: Array, default: [] },
            description: { type: String, required: true }
        })

        const foodCategorySchema = new mongoose.Schema({
            CategoryName : {type : String}
        })

        const fetched_data = await mongoose.model("food_items", foodItemSchema);
        const data = await fetched_data.find({});
        // const foodCategory = await mongoose.connection.db.collection("food_Category");
        // const catData = await foodCategory.find({}).toArray();

        const foodCategory = await mongoose.model("food_category",foodCategorySchema);
        const catData = await foodCategory.find({});

        global.food_items = data;
        //console.log(global.food_items)
        global.foodCategory = catData;
        //console.log(global.foodCategory);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

module.exports = connectToMongoDB;
