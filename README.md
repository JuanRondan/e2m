# EtoM (excel to mongo)

Reads an excel file and creates a mongo database.

Features:
- Each sheet maps to a collection
- Each row maps to a document
- If a column's name contains "attachment" it will try to get the file and save it as a binary

## Install

### NPM / Node

```javascript
npm install
```

## Usage / Examples

In src/config/config.ts you can modify some parameters:
- Database conection
- File to be processed
- Columns' name row
