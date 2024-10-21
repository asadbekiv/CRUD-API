import { User } from '../types/userType';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';
import * as path from 'path';

let users: User[] = [];

const usersFilePath = path.join(process.cwd(), 'src/data/users.json');

const saveUsersToFile = (): void => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

const loadUsersFromFile = (): void => {
  if (fs.existsSync(usersFilePath)) {
    const fileData = fs.readFileSync(usersFilePath, 'utf-8');
    users = JSON.parse(fileData) as User[];
  }
};

loadUsersFromFile();

export const getAllUsers = (): User[] => {
  return users;
};

export const getUserById = (id: string): User | undefined => {
  const user = users.find((e) => {
    return e.id === id;
  });

  return user;
};

export const createUser = (userData: Omit<User, 'id'>): User => {
  const newUser: User = { id: uuidv4(), ...userData };
  users.push(newUser);
  saveUsersToFile();
  return newUser;
};

export const updateUser = (
  id: string,
  userData: Omit<User, 'id'>
): User | null => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    users[index] = { id, ...userData };
    saveUsersToFile();
    return users[index];
  }

  return null;
};

export const deleteUser = (id: string): boolean => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    users.splice(index, 1);
    saveUsersToFile();
    return true;
  }
  return false;
};
