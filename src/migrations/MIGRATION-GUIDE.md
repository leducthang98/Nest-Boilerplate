### migrate database (This folder is only used for tracing the version of the database migration or rolling back to a specified step):
- update entities (optional)
- run `yarn typeorm:generate` to generate a migration file
    - this command will generate based on the current database table. (sync db with entity is the most important)
    - delete entity files not trigger the generation
- run `yarn typeorm:migrate` to migrate the database

