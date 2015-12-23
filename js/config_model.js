


// TASK
Admin.model.Task = {};

// TASK fields 
Admin.model.Task.fields = {
	id:    {type:'t:Identifier'},
	title: {type:'t:String', canBeEmpty: false, maxSize: 200},
	desc:  {type:'t:Text', maxSize: 3000}
};

Admin.model.Task.viewTable = [
	{field: 'id',    title: 'ID' ,         width:'50px'},
	{field: 'title', title: 'Title',       width: '200px', sortable:true},
	{field: 'desc',  title: 'Description',                 sortable:true}
];

