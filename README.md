## And... Vote!

Voting web application using: 

- Node.js
- React
- Webpack
- Bootstrap

Push to master to see it runing [here](https://andvote-luis.herokuapp.com/)

### Run Dev

```bash
git clone <this-repo>
cd <this-repo>
npm install

DB_SCHEMA=andvote_schema \
DB_USER=root \
DB_PWD=root \
DB_HOST=localhost \
DB_PORT=3306 \
npm run Dev
```

### Build Bundle

```bash
git clone <this-repo>
cd <this-repo>
npm install

npm run production
```