import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const genToken = async (id) => {

    try {
        const token = await jwt.sign({userId: id}, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });
        return token;
    } catch (error) {
        throw new Error("Error generating token");
    }
}

export default genToken;