### migrate database (This folder is only used for tracing the version of the database migration or rolling back to a specified step):
- update entity
- yarn typeorm:generate 
    - this command will generate base on current db's table (syncDb with Entity is the most important)
    - delete entity files with not trigger the generation
- yarn typeorm:migrate

