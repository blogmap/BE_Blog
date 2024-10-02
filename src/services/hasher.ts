import { hashSync, compareSync, genSaltSync } from "bcrypt";
const dotenv = require('dotenv');
dotenv.config();

export function hash(x: string): string {
  try {
    const saltRound = parseInt(process.env.SALT_ROUND ?? "10", 10);
    // console.log('SALT_ROUND:', saltRound); 

    const salt = genSaltSync(saltRound);
    // console.log('SALT', salt);
    const hashedPassword = hashSync(x, salt); 
    
    // console.log('hashedPassword:', hashedPassword); 
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error); 
    throw error; 
  }
}

export function compare(text: string, digest: string): boolean {
  return compareSync(text, digest);
}
