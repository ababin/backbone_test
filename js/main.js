$(function(){
	
	// отключаем кэширование запросов
	$.ajaxSetup({ cache: false });
	
	// создаем левое меню
	leftMenuView = new LeftMenuView();
	
	// GRID -
	cuteGrid = gridManager.createGrid();
	
	// создаем роутер	
	new GlobalRouter();
	
	// Start Backbone history a necessary step for bookmarkable URL's
	Backbone.history.start();
	
	
	
	
	
	
});

var db = {
		
	createNewTask: function(){
		var newTask = new Task({title: $('#taskTitle').val(), desc: $('#taskDesc').val()});
    	newTask.save({},{
    		success: function(model, result, xhr){
    			alert('success');
    		},
    		
    		error: function(model, result, xhr){
    			alert('error');
    		},
    	});
	}	
		
}; 

var gridManager = {
	createGrid: function(){
		return new CuteGrid({
			component:'cuteGrid',
			container: '#right_content', 
			collection: pagedTasks, 
			caption: 'Table caption',
			needShowRowIndex: true,
			fixHeight: true});
	}
};




