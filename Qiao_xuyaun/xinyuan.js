const express = require("express");
const http = express();
const url = "mongodb://localhost:27017";
const Db = require("./js/mongodbFZ.js");
let db = new Db("xinyuan");
http.use((req,res,next)=>{
	res.header("Access-Control-Allow-Origin","*");
	next();
})
http.listen(8080,()=>{
	console.log("服务已启动");
})
//添加
http.get("/add",(req,res)=>{
	let time = new Date().getTime();
	let data = req.query;
	data.time = time;
	data.color = 0;
	db.insertOne("xin",data,(err,data)=>{
		if (err) {
			res.send("添加失败")
			if () {
				
			}
		} else{
			res.send("添加成功")
		}
	})
})
//回显
http.get("/init",(req,res)=>{
	let obj = {
		query:{},
		limit:8,
	};
	db.find("xin",obj,(err,data)=>{
		if(err) throw err;
		res.send(data);
	})
})
//删除
http.get("/del",(req,res)=>{
	let id = req.query.id;
	db.deleteById("xin",id,(err,data)=>{
		if(err) throw err;
		res.send("删除成功");
	})
})
//点击变色
http.get("/bian",(req,res)=>{
	let id = req.query.id;
	db.findById("xin",id,(err,data)=>{
		if (err) {
			res.send("渲染失败");
		} else{
			data.color = data.color?0:1;
			db.updateById("xin",id,data,(err,data1)=>{
				if (err) {
					res.send("修改失败");
				} else{
					res.send("修改成功");
				}
			})
		}
	})
})