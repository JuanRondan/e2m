const excelConfig = {
    sourceFile: 'test.xlsx',
    headerRow: 1
}

const mongoConfig = {
    //url: 'mongodb://localhost:C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==@localhost:10255/admin?ssl=true',
    user: undefined, //'localhost',
    password: encodeURIComponent('C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw=='),
    host: 'localhost',
    port: 10255,
    database: 'test',
    ssl: true
}

export { excelConfig, mongoConfig }