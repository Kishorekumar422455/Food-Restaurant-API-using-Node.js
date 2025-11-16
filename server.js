const express=require('express');
const colors=require('colors');
const cors=require('cors');
const morgan=require('morgan');
const dotenv=require('dotenv');
const connectDB = require('./config/db');

//rest object
const app=express();

//configure dotenv
// Safer dotenv loading: allow a custom path via DOTENV_PATH, fall back to '.env',
// do not override existing environment variables, and only load in non-production.
const dotenvPath = process.env.DOTENV_PATH || '.env';

if (process.env.NODE_ENV !== 'production') {
    const result = dotenv.config({ path: dotenvPath, override: true });
    if (result.error) {
        console.warn(`No .env found at ${dotenvPath}; relying on environment variables`);
    }
}

//connection
connectDB();

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

//route
//URL=> https://localhost:8080/test

app.use('/api/v1/test', require('./routers/testRoutes'));
app.use('/api/v1/auth', require('./routers/authRoutes'));
app.use('/api/v1/user', require('./routers/userRoutes'));
app.use('/api/v1/restaurant',require('./routers/restaurantRoutes'));
app.use('/api/v1/category',require('./routers/categoryRoutes'));
app.use('/api/v1/food',require('./routers/foodRoutes'));
app.use('/api/v1/orders',require('./routers/orderRoutes'));


app.get('/',function(req,res){
    return res.status(200).send('<h1 style="text-align:center;">Welcome to food server and Food app API</h1>');
});

//port (default to 8080 when PORT is not set)
const port = process.env.PORT||3000;

// Listen and add diagnostics hooks to catch unexpected exits.
const server = app.listen(port, function(){
    console.log(`Server is running on ${port}`.white.bgBlue);
    console.log('PID:', process.pid);
});

// // Log the actual address the server is bound to (helps debug binding issues)
// try {
//     const addr = server.address();
//     console.log('Server address:', JSON.stringify(addr));
//     console.log('Server listening?', server.listening === true);
// } catch (e) {
//     console.warn('Could not read server.address()', e);
// }

// server.on('close', () => {
//     console.warn('Server closed');
// });

// process.on('uncaughtException', (err) => {
//     console.error('Uncaught exception:', err);
// });

// process.on('unhandledRejection', (reason) => {
//     console.error('Unhandled rejection:', reason);
// });
