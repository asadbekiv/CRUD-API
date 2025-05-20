import { IncomingMessage, ServerResponse } from 'http';

export const errorHandler = (controller: Function) => {
  return async (
    req: IncomingMessage,
    res: ServerResponse,
    ...args: any[]
  ): Promise<void> => {
    try {
      await controller(req, res, ...args);
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(
        JSON.stringify({ status: 'error', message: 'Internal Server Error' })
      );
    }
  };
};
