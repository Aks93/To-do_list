var express = require('express');
var router =  express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://Aks93:aks28091993@ds121834.mlab.com:21834/task',['tasks']);

router.get('/tasks',function(req,res,next){
 db.tasks.find(function(err,tasks){
 	if(err){
 		res.send(err);
 		console.log(err);
 	}
 	res.json(tasks);
 	//console.log(tasks);
 });
});

router.get('/task/:id',function(req,res,next){
 db.tasks.findOne({_id:mongojs.ObjectId(req.params.id)},function(err,task){
 	if(err){
 		res.send(err);
 		console.log(err);
 	}
 	res.json(task);
 	console.log(task);
 });
});

router.post('/task',function(req,res,next){
	var task = req.body;
	if(!task.title || !(task.isDone + ''))
	{
		res.status(400);
		res.json({
			"error": "Bad data"
		});
	}
	else
	{
		db.tasks.save(task, function(err,task){
             if(err){
             	res.send(err);
             }
             else
             {
             	res.send(task);
             }
		});
	}
});


router.delete('/task/:id',function(req,res,next){
 db.tasks.remove({_id:mongojs.ObjectId(req.params.id)},function(err,task){
 	if(err){
 		res.send(err);
 		console.log(err);
 	}
 	res.json(task);
 	console.log(task);
 });
});


router.put('/task/:id',function(req,res,next){
	var task = req.body;
	var updTask = {};
	if(task.isDone)
	{
		updTask.isDone = task.isDone;
	}
	if(task.title)
	{
		updTask.title = task.title;
	}

	if(!updTask)
	{
      res.send(400);
      res.json({
        "error":"Bad data"
      });
	}
	else
	{
	 db.tasks.update({_id:mongojs.ObjectId(req.params.id)},updTask,{},function(err,task){
 	if(err){
 		res.send(err);
 		console.log(err);
 	}
 	res.json(task);
 	console.log(task);
      });	
	}

    
});
module.exports = router;