import test from 'node:test';
import assert from 'assert';
import { server } from '../server';

const PORT = 3001;
const base = `http://localhost:${PORT}`;

test.before(async () => {
  await new Promise<void>((resolve) => server.listen(PORT, resolve));
});

test.after(() => {
  server.close();
});

test('API test POST method /api/users endpoint', async () => {
  let res = await fetch(`${base}/api/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: 'Asad',
      age: 21,
      hobbies: ['Outdoor games'],
    }),
  });

  const newUser = await res.json();

  assert.strictEqual(res.status, 201);
  assert.strictEqual(newUser.data.age, 21);
  assert.strictEqual(newUser.data.username, 'Asad');
});

test('API test GET method /api/users endpoint', async () => {
  let res = await fetch(`${base}/api/users`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  const result = await res.json();

  assert.strictEqual(res.status, 200);
  assert.strictEqual(result.results, 1);
  assert.strictEqual(result.status, 'success');
  assert.deepStrictEqual(result, {
    data: [
      {
        id: result.data[0].id,
        username: 'Asad',
        age: 21,
        hobbies: ['Outdoor games'],
      },
    ],
    results: 1,
    status: 'success',
  });
});

test('API test GET(only one) method /api/users/:id endpoint', async () => {
  let res = await fetch(`${base}/api/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: 'Asad',
      age: 21,
      hobbies: ['Outdoor games'],
    }),
  });
  const createdUser = await res.json();

  let user = await fetch(`${base}/api/users/${createdUser.data.id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  const result = await user.json();

  assert.strictEqual(user.status, 200);
  assert.strictEqual(result.data.age, 21);
  assert.strictEqual(result.data.hobbies[0], 'Outdoor games');
});

test('API test PUT method /api/users/:id endpoint', async () => {
  let res = await fetch(`${base}/api/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: 'Asad',
      age: 21,
      hobbies: ['Outdoor games'],
    }),
  });
  const createdUser = await res.json();
  let updatedUser = await fetch(`${base}/api/users/${createdUser.data.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: 'Asadbek',
      age: 21,
      hobbies: ['Outdoor games', 'Chess'],
    }),
  });

  const result = await updatedUser.json();

  assert.strictEqual(res.status, 201);
  assert.strictEqual(result.data.username, 'Asadbek');
  assert.strictEqual(result.data.id, createdUser.data.id);
});

test('API test DELETE method /api/users/:id endpoint', async () => {
  let res = await fetch(`${base}/api/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: 'Asad',
      age: 21,
      hobbies: ['Outdoor games'],
    }),
  });
  const createdUser = await res.json();

  let deletedUser = await fetch(`${base}/api/users/${createdUser.data.id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });

  assert.strictEqual(deletedUser.status, 204);

  let deletedUserSomeId = await fetch(
    `${base}/api/users/${createdUser.data.id}`,
    {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    }
  );
  const result = await deletedUserSomeId.json();
  assert.strictEqual(deletedUserSomeId.status, 404);
  assert.strictEqual(result.status, 'fail');
});
