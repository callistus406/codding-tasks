import bcrypt from 'bcryptjs';

interface User {
    id: number;
    username: string;
    phone: string;
    password: string;
}

const users: User[] = [];

const defaultUser: User = {
    id: 1,
    username: 'admin',
    phone: "08137127355",
    password: bcrypt.hashSync('password123', 10)
};
users.push(defaultUser);

export const findUserByUsername = (username: string): User | undefined => {
    return users.find(user => user.username === username);
};

export const findUserById = (id: number): User | undefined => {
    return users.find(user => user.id === id);
};
