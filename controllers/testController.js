const testUserController = (req, res) => {
    try {
        // Return a single JSON response.
       
        return res.status(200).send('<h1>Test User Data</h1>')
    } catch (error) {
        console.error('Error in Test API', error);
    }
};

module.exports = {
    testUserController
};