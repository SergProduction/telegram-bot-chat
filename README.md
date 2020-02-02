### Start
install npm packages - `npm i`

### Create user and database
`sudo -u postgres psql -f create-db-and-user.sql`

### Create tables
`npm run migrate`

### Fill database from telegram html
- create folder `./telegram-html`
- copy in that folder telegram html files
- `npm run filldb`