# Not A Quite Base
This is a javascript based layer helping to stucture the incomming data.

# What is the This layer
This layer is look like databases but it store data temporary in memory, stucture it and shape it as you like, with tons of functions and more. **Still Under Developement**, so if you wanted to help please ask and i be happy to work with you.

# Why this layer
I am alwayes have to deal with incomming data from any where, if i have database i must validate the data before store it **BUT** if i haven't database and you want to process your data then what **??**, the answer is beyond this layer **WHY** simply this layer has all database functionality and i hope it will help you to validate the data before processing it

# Installation

```html
<script src="./Storage.js"></script>
```
```js
var database = new BasicStorage(Scheme);
```

# Basic Usage
```js
//  DataBase Created
var database = new BasicStorage({
    id: {type: 'number', attr: 'auto-increment', key: 'primary'},
    name: {type: 'string', default: 'No Name'},
    age: {type: 'number', Null: false},
    email: {type: 'string', Null: false}
});

//  Insert into DataBase
a = database.Insert({
                name: name,
                age: Number.isInteger(Number(age)) ? Number(age) : age,
                email: email
            });
//  Check if Insertion success or error raised
console.log(a);
```

# API

## BasicStorage(Scheme)

## Insert(values)

## Delete

## Update

## SelectCol

## SelectAll

## GetColsNames
