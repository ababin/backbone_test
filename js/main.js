$(function(){
	
	// отключаем кэширование запросов
	$.ajaxSetup({ cache: false });
	
	// создаем левое меню
	leftMenuView = new LeftMenuView();
	
	cuteGrid = new CuteGrid({component:'cuteGrid',container: '#right_content', collection: pagedTasks, caption: 'Table caption'});
	
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
	showTasksGrid: function(){
		new bbGrid.View({        
		    caption: 'Test grid !',
			container: $('#right_content'),        
		    collection: tasks,
		    colModel: [{ title: 'ID', name: 'id', sorttype: 'number'  },
		               { title: 'Title', name: 'title' },
		               { title: 'Desc', name: 'desc' } ],
		    enableSearch: true,
		    rows : 10
		});
	}
};

//создаем cuteGrid
var cuteGrid; 




