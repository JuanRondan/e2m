import * as excelToJson from 'convert-excel-to-json'
import { MongoClient, InsertWriteOpResult } from 'mongodb'

import { excelConfig, mongoConfig } from './config/config';


const collections = excelToJson({
    sourceFile: excelConfig.sourceFile
    ,header:{
        rows: excelConfig.headerRow
    }
    ,columnToKey: {
        '*': '{{columnHeader}}'
    }
});

//const url = `mongodb://${mongoConfig.user}:${mongoConfig.password}@${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.database}?ssl=${mongoConfig.ssl}`;
const url = `mongodb://${mongoConfig.host}:27017/test`;

const mongoClient = new MongoClient( url, {useNewUrlParser: true} );

mongoClient.connect()
.then(
    (mongoClient: MongoClient) => {
        const collectionsNames = Object.keys(collections);

        collectionsNames.forEach(
            (name) => {
                //console.log(`collection ${name}`);
                //console.log(collections[name]);

                mongoClient.db()
                .collection(name)
                .insertMany(collections[name])
                .then(
                    (response: InsertWriteOpResult) => {
                        console.log(`data saved to ${name} collection (${response.insertedCount} insertions)`);
                        //console.log(response);
                    }
                ).catch(
                    err => console.log(err)
                )
            }
        )
        mongoClient.close();
    }    
)
.catch(
    err => { throw new Error(err); }
)