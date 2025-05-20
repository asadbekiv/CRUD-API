import { validate as isUuid } from 'uuid';
import { IncomingMessage, ServerResponse } from 'http';

export const isValidUuid = (id: string, res: ServerResponse): boolean => {
  if (!isUuid(id)) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(
      JSON.stringify({ status: 'fail', message: 'Invalid user ID format' })
    );
    return false;
  }
  return true;
};
