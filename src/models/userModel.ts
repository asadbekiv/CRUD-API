import { User } from '../types/userType';
import { v4 as uuidv4 } from 'uuid';

let users: User[] = [];

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
  return newUser;
};

export const updateUser = (
  id: string,
  userData: Omit<User, 'id'>
): User | null => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    users[index] = { id, ...userData };
    return users[index];
  }

  return null;
};

export const deleteUser = (id: string): boolean => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    users.splice(index, 1);
    return true;
  }
  return false;
};
