# zax-exchange-server

Project setup

1. clone Notification-Server repo and start local server
2. clone this repo
3. make sure your node version is >= 16
4. install docker and run local redis instance (POC: william@zaxexchange.com)
5. create `.env` file (see env repo) and put necessary credentials
6. run `npm install`
7. run `npm run start`
8. should see `connected to redis`, `notification server connected`, `db connected` and `server ready` log when server starts successfully

Sequelize migration

* Running migration created by other people
   1. run `npm run migrate`
* Creat your own migration
   1. run `npm run generate-migration-skeleton` and a new template will be generated in migrations folder.
   2. change the generated template file extension to `.cjs`
   3. rename the generated template and follow the same format as the example one.
   4. add your migration logic in the file
   5. run `npm run migrate` and verify db
   6. run `npm run unmigrate` if you need to revert the migration

VS Code Extensions
- Required
   - ESLint
   - Prettier
   - Run On Save
   - YAML
- Optional
   - GraphQL for VS Code
   - Import Cost

# Notes
- [Get started on server tech stack](https://github.com/Zax-Exchange/zax-exchange-server/wiki/Get-Started)
