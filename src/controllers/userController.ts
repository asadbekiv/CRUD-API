import { IncomingMessage, ServerResponse } from 'http';
import { validate as isUuid } from 'uuid';

import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../models/userModel';

import { isValidUuid } from '../utils/validationUserId';
import { errorHandler } from '../utils/errorHandler';

const getAllUsersController = errorHandler(
  async (
    req: IncomingMessage,
    res: ServerResponse,
    id: string
  ): Promise<void> => {
    const users = await getAllUsers();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({ status: 'success', results: users.length, data: users })
    );
  }
);

const getUsersByIdController = errorHandler(
  async (
    req: IncomingMessage,
    res: ServerResponse,
    id: string
  ): Promise<void> => {
    if (!isValidUuid(id, res)) return;

    const user = await getUserById(id);

    if (user) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'success', data: user }));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'fail', message: 'User not found' }));
    }
  }
);

const updateUsersController = errorHandler(
  async (
    req: IncomingMessage,
    res: ServerResponse,
    id: string
  ): Promise<void> => {
    if (!isValidUuid(id, res)) return;

    const userExsist = getUserById(id);
    if (!userExsist) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'fail', message: 'User not found' }));
      return;
    }
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        const { username, age, hobbies } = JSON.parse(body);
        if (!username || typeof age !== 'number' || !Array.isArray(hobbies)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(
            JSON.stringify({
              status: 'fail',
              message: 'Invalid or missing user data',
            })
          );
          return;
        }
        const updatedUser = updateUser(id, { username, age, hobbies });
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'success', data: updatedUser }));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({ status: 'fail', message: 'Invalid JSON format' })
        );
      }
    });
  }
);

const createUsersController = errorHandler(
  async (
    req: IncomingMessage,
    res: ServerResponse,
    id: string
  ): Promise<void> => {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      try {
        const { username, age, hobbies } = JSON.parse(body);

        if (!username || typeof age !== 'number' || !Array.isArray(hobbies)) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(
            JSON.stringify({
              status: 'fail',
              message: 'Invalid or missing user data',
            })
          );
          return;
        }

        const newUser = createUser({ username, age, hobbies });
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'success', data: newUser }));
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(
          JSON.stringify({ status: 'fail', message: 'Invalid JSON format' })
        );
      }
    });
  }
);

const deleteUsersController = errorHandler(
  async (
    req: IncomingMessage,
    res: ServerResponse,
    id: string
  ): Promise<void> => {
    if (!isValidUuid(id, res)) return;

    const result = deleteUser(id);

    if (result) {
      res.writeHead(204);
      res.end();
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'fail', message: 'User not found' }));
    }
  }
);

export {
  getAllUsersController,
  getUsersByIdController,
  deleteUsersController,
  updateUsersController,
  createUsersController,
};
