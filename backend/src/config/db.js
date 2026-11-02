import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn =await mongoose.connect(process.env.MONGO_URI);
        console.log(`✅ Connected to MongoDB: ${conn.connection.host}`);
        console.log(`📊 Database: ${conn.connection.name}`);
    } catch (error) {
        console.error(`❌ Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
    }
}

// Gestion des événements de connexion et de déconnexion
mongoose.connection.on(`connect`, ()=>{
    console.log(`🔌 MongoDB connected`);
})

mongoose.connection.on(`disconnect`, ()=>{
    console.log(`⚠️ MongoDB disconnected`);
})

mongoose.connection.on(`error`, (err)=>{
    console.log(`❌ Error MongoDB: ${err.message}`);
})

// Gestion de propre l'arrêt
process.on(`SIGINT`, async()=>{
    await mongoose.connection.close();
    console.log(`🛑 MongoDB connection closed due to app termination`);
    process.exit(0);
})
export default connectDB;