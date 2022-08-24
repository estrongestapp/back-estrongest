import dotenv from 'dotenv';

let path = '.env';
if (process.env.NODE_ENV === 'test') {
    path = '.env.test';
}
if (process.env.NODE_ENV === 'dev') {
    path = '.env.dev';
}

dotenv.config({ path });