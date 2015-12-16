$(function(){
	
	// AJAX settings ------------------------------------------------------------------------

	// отключаем кэширование запросов
	$.ajaxSetup({ cache: false });
	
	// визуализация
	$(document).ajaxSend(function(event, request, settings) {
	    $('#loading-indicator').show();
	});

	$(document).ajaxComplete(function(event, request, settings) {
	    $('#loading-indicator').hide();
	});
	// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
	
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
			fixHeight: true,
			columns:[
		                {title: 'ID', modelAttr:'id', width: '50px' },
		                {title: 'TITLE', modelAttr:'title', width: '100px', orderEnabled: true},
		                {title: 'DESC', modelAttr:'desc', orderEnabled: true}
		            ]
		});
	}
};


DialogManager = function(){
	
	// mode can be follows: R - read , M-modify,  
	
	DialogManager.prototype.showDialogFor = function(grid, recId){
		model = grid.collection.at(recId);
		setHeader('Window header for ' + grid.component);
		setContent('hello !!!');
		showModalWindow();
	};
	
	DialogManager.prototype.showDialogForRead = function(grid, recId){
		model = grid.collection.at(recId);
		setHeader('Window header for ' + grid.component);
		setContent('hello !!!');
		showModalWindow();
	};
	
	setHeader = function(data){
		var header =  $('#modalWindow div.modal-dialog div.modal-content div.modal-header h4.modal-title');
		header.html(data);
	};
	
	setContent = function(data){
		var content =  $('#modalWindow div.modal-dialog div.modal-content div.modal-body');
		content.html(data);
	};
	
	showModalWindow = function(){
		$('#modalWindow').modal();
	};
	
};
var dialogManager = new DialogManager();



