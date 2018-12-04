import * as excelToJson from 'convert-excel-to-json'
import { MongoClient, InsertWriteOpResult } from 'mongodb'
import { readFileSync, existsSync } from 'fs';

import { excelConfig, mongoConfig } from './config/config';


const url = (mongoConfig.user) ?
    `mongodb://${mongoConfig.user}:${mongoConfig.password}@${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.database}?ssl=${mongoConfig.ssl}`
    : `mongodb://${mongoConfig.host}:27017/test`;

const mongoClient = new MongoClient( url, {useNewUrlParser: true} );

mongoClient.connect()
.then(
    (mongoClient: MongoClient) => {

        const collections = excelToJson({
            sourceFile: excelConfig.sourceFile
            ,header:{
                rows: excelConfig.headerRow
            }
            ,columnToKey: {
                '*': '{{columnHeader}}'
            }
        });

        const collectionsNames = Object.keys(collections);

        collectionsNames.forEach(
            (name) => {
                //console.log(`collection ${name}`);
                //console.log(collections[name]);

                checkDataTypes(collections[name]);

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
                );

            }
        )
        mongoClient.close();
    }
)
.catch(
    err => { throw new Error(err); }
)

function checkDataTypes(collection){
    collection.forEach(
        (item) => {

            for( let property in item ){
                if( property.indexOf('attachment') >= 0 ){
                    if( existsSync(item[property]) ){                        
                        item[property] = {
                            name: item[property].substring(item[property].lastIndexOf('\\') + 1),
                            data: readFileSync(item[property])
                        };
                    }
                }else if ( typeof item[property] === "string" && (item[property].toLowerCase() === 'true' || item[property].toLowerCase() === 'false') ){
                    item[property] = Boolean(item[property]);
                }
            }

        }
    );
}
