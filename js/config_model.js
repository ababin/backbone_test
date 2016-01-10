


// TASK
Admin.model.Task = {};

// TASK fields 
Admin.model.Task.fields = {
	id:    {type:'t:Identifier', name:'ID'},
	title: {type:'t:String', required: true, maxSize: 200, name:'Title'},
	desc:  {type:'t:Text', maxSize: 3000,name:'Description'}
};

Admin.model.Task.viewTable = [
	{field: 'id',    title: 'ID' ,         width:'50px'},
	{field: 'title', title: 'Title',       width: '200px', sortable:true},
	{field: 'desc',  title: 'Description',                 sortable:true}
];

Admin.model.Task.viewCard = [
	{field: 'id'},
	{field: 'title'},
	{field: 'desc'}
];


//PROJECT
Admin.model.Project = {};

// PROJECT fields 
Admin.model.Project.fields = {
	id:    {type:'t:Identifier', name:'ID'},
	name: {type:'t:String', required: true, maxSize: 200, name:'Name'},
	desc:  {type:'t:Text', maxSize: 4000,name:'Description'}
};

Admin.model.Project.viewTable = [
	{field: 'id',    title: 'ID' ,         width:'50px'},
	{field: 'name',  title: 'Name',       width: '200px', sortable:true},
	{field: 'desc',  title: 'Description',                 sortable:true}
];

Admin.model.Project.viewCard = [
	{field: 'id'},
	{field: 'name'},
	{field: 'desc'}
];


