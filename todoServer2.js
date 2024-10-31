/* 
Part 2 Tasks:

1. Implement and explain the logic for extracting the index from the
req.url

2. Implement and explain the logic for checking on the validity of the
index value

3. Implement and explain the logic for responding to client in case of
an invalid index value

4. Implement and explain the logic for handling a two-digit index 

5. Implement and explain the logic for item at index is not found 

6. Implement and explain the logic for responding to client in case of
item at index is not found

7. Implement and explain the logic for reading the incoming item

8. Implement and explain the logic for updating the item at the
specified index

9. Implement and explain the logic for responding to client in case of
successful update
*/

//Add dependencies
const http = require('http');
const path = require('path');

//Request handler – defined as a named arrow function expression
const reqHandler = (req,res)=>{
    //get the HTTP handler
    switch(req.method){
        case 'POST':
            processPOST(req,res);
            break;
        
        case 'GET':
            processGET(req,res);
            break;

        case 'DELETE':
            processDelete(req,res);
            break;

        case 'PUT':
            processPUT(req,res);
            break;
    }    ;
}

let items = ["Play Friday Night Funkin'", "Go to Dance Practice"];

//Create the server
const server = http.createServer(reqHandler);

//1. Server listens on port given in command line argument
if (process.argv.length < 3){
    console.log(`Missing Server Port Number\nUsage: node ${path.basename(process.argv[1])} [port number]`);
    return;//2. server script terminates without a port number
}

//assign the chosen port number to a variable
let portNum = process.argv[2];

//2. send error message and terminate if port number is below 3000
if (portNum<3000){
    console.log("Port number must be greater or equal to 3000");
    return;
}

server.listen(portNum,()=>
 {console.log(`Server running on port ${portNum}`)});


function processGET(req, res) {
    let todoList = items.length;
    if(todoList === 0){
        res.end("Your To-Do list is empty. Well Done!!!");
    } else{
        console.log('Process GET request');
        let response = "";

        items.forEach((element, index)=>{
            response += ++index + ")" + element + '\n';
        });
        res.end(response);
    };
    
    
};

function processPOST(req, res) {
    console.log('Process POST request');
    req.setEncoding('utf-8');
    
    let item = "";
    req.on('data', (tmpData)=>{
        item += tmpData;
    });

    req.on('end', ()=>{
        items.push(item);
        res.end("OK");
        console.log(items);
    })
};

function processDelete(req, res) {
    let url = req.url;
    let min = 1;
    let max = 999;
    //Assuming we are getting valid index.
    let index = url.replace("/", "");
    if (isNaN(index)) {//invalid value for index
        console.log("Index sent is Invalid")
        res.end("Index sent is Invalid");
    } else if(index == ""){//missing index
        console.log('Missing Index');
        res.end("Missing Index");
    }else if(index>= min && index <= max){//working with lists that can handle indices from 1 - 999
        console.log("Within Range");
        items.splice((parseInt(index)-1), 1);
        res.end();
    } else{
        items.splice((parseInt(index)-1), 1); //mapping the index from the client side to match the server side [have /1 = index[0]]
        res.end("OK");
    }

};

function processPUT(req, res) {
    console.log('Process PUT request');

    let url = req.url;
    let min = 1;
    let max = 999;

    //Assuming we are getting valid index.
    let index = url.replace("/", "");
    if (isNaN(index)) {//invalid value for index
        console.log("Index sent is Invalid")
        res.end("Index sent is Invalid");
    } else if(index == ""){//missing index
        console.log('Missing Index');
        res.end("Missing Index");
    }else if(parseInt(index) < 1 || parseInt(index) >= items.length){
        console.log("Index is not found");
        res.end("Index is not found");
    }else if(index>= min && index <= max){//working with lists that can handle indices from 1 - 999
        console.log("Within Range");
    } else{
        items.splice((parseInt(index)-1), 1); //mapping the index from the client side to match the server side [have /1 = index[0]]
    }
    
    req.setEncoding('utf-8');
    
    let item = "";
    req.on('data', (tmpData)=>{
        item += tmpData;
    });

    req.on('end', ()=>{
        items.fill(item, (parseInt(index) - 1), parseInt(index));
        res.end("OK");
        console.log(items);
    })
}