const bcrypt = require('bcrypt');


const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);  
        const hash = await bcrypt.hash(password, salt);  
        return hash;  
    } catch (error) {
        throw new Error("Encryption Error: " + error.message);
    }
};


const compareHashPassword = async (password, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);  
        return isMatch;  
    } catch (error) {
        throw new Error("Password Mismatch: " + error.message);
    }
};

module.exports = { hashPassword, compareHashPassword };

    