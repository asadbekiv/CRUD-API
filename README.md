
> Please use ! `develop` branch for cross-checking


Task 3 CRUD-API project. Postman documentation api https://documenter.getpostman.com/view/33197493/2sAXxY48VM


### **Check**
For check simplification you have pre-implemented npm-scripts in package.json

---

### Test scripts

```bash
# install node_modules and npm packages
$ npm install

# run development mode
$ npm run start:dev

# run production mode
$ npm run start:prod
```

---

### Scoring: CRUD API
**Basic Scope**

- +10 The repository with the application contains a Readme.md file containing detailed instructions for installing, running and using the application
- +10 GET api/users implemented properly
- +10 GET api/users/{userId} implemented properly
- +10 POST api/users implemented properly
- +10 PUT api/users/{userId} implemented properly
- +10 DELETE api/users/{userId} implemented properly
- +6 Users are stored in the form described in the technical requirements
- +6 Value of port on which application is running is stored in .env file

**Advanced Scope**

- +30 Task implemented on Typescript
- +10 Processing of requests to non-existing endpoints implemented properly
- +10 Errors on the server side that occur during the processing of a request should be handled and processed properly
- +10 Development mode: npm script start:dev implemented properly
- +10 Production mode: npm script start:prod implemented properly
