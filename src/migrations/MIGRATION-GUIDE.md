### migrate database:
- update entity
- yarn typeorm:generate src/migrations/${filename} 
    - this command will generate base on current db's table (sync DB with Entity is the most important)
    - delete entity files with not trigger the generation
- yarn typeorm:migrate

