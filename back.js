const express = require("express");
const mysql = require('mysql');
const app = express();
app.use(express());

var con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Harish@123",
    database:"hari",
});

con.connect(function(err){
    if(err) throw err;
    console.log("connected")
})

app.get('/get',(req,res)=>{
    try{
        let getQuery =`SELECT * FROM registration_form`
        con.query(getQuery,(error,result)=>{
        if(!error){
            res.send(result)
            console.log(result)
        }else{
            console.log(error)
        }
        })
    }catch(e){
        console.log(e)
    }
});

app.post('/new',(req,res)=>{
    console.log(req)
    try{
        const Id=req.body.id
        const name=req.body.name
        const email=req.body.email
        const phone_number=req.body.phone_number
        let postQuery =`INSERT INTO registration_form(id,name,email,phone_number) values(${Id},'${name}','${email}',${phone_number});`
        con.query(postQuery,(err,result) => {
            console.log(err)
            if (!err){
                res.send(result);
                console.log(result);
                console.log(req.body)
                console.log("Data Created Sucessfully");
            }else{
                console.log("Unable To Add Data");
            }
        });
    }catch(e){
        console.log(e)
    }
});

app.put('/update/:id',(req,res)=>{
    try{
        const Id =req.params.id
        const GivenIdQuery=`SELECT * FROM registration WHERE id=${Id}`
        con.query(GivenIdQuery,(err)=>{
            const updateId=Id
            const updateName=req.body.name
            const updateEmail=req.body.email
            const updatePhone_number=req.body.phone_number
            const UpdatedQuery=`UPDATE registration_form SET name='${updateName}',email='${updateEmail}',phone_number=${updatePhone_number} WHERE id=${updateId}`
            con.query(UpdatedQuery,(err,result)=>{
                if(!err){
                    res.send(result)
                    console.log(result)
                }else{
                    console.log(err)
                }
            })
        })
    }catch(e){
        console.log(e)
    }
});

app.delete('/delete/:id',(req,res)=>{
    try{
        const id =req.params.id
        const DeleteQuery =`DELETE FROM registration_form WHERE id=${id};`
        con.query(DeleteQuery,(err,result)=>{
            if (!err){
                res.send("Data Deleted Sucessfully")
                console.log("Data Deleted Sucessfully")
            }else{
                console.log(err)
            }            
        });
    }catch(e){
        console.log(e)
    }
});

app.listen(4008);

