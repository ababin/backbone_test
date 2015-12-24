


// TASK
Admin.model.Task = {};

// TASK fields 
Admin.model.Task.fields = {
	id:    {type:'t:Identifier', name:'ID'},
	title: {type:'t:String', canBeEmpty: false, maxSize: 200, name:'Title'},
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

