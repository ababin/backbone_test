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
			itemClass: 'Task',
			caption: 'Table caption',
			needShowRowIndex: true,
			fixHeight: true,
		});
	}
};


DialogManager = function(){
	
	this.totalMode = 'CRUD';
	this.curMode;
	this.grid;
	this.bbModel;
	
	// mode can be follows: CRUD  
	
	DialogManager.prototype.showCard = function(_grid, _recId, _totalMode, _mode){
		this.grid = _grid;
		this.totalMode = _totalMode;
		this.curMode = _mode; 
		this.bbModel = _mode == 'C' ? new Task() : _grid.collection.at(_recId);  
				
		if(!lib.mode.havePermissions(_mode, _totalMode)){
			alert('!!! Permisions denied for ' + lib.mode.getOperationName(_mode));
			return;
		}
		
		prepareHeader('Window header for ' + this.grid.component, this.totalMode, this.curMode);
		
		var html = '';
		for(var i =0; i < Admin.model[_grid.itemClass].viewCard.length; i++){
			var field = Admin.model[_grid.itemClass].viewCard[i].field;
			var typedObject = Admin.types.Factory.createType(this.bbModel.get(field), _grid.itemClass , field); 
			html += typedObject.renderForCard(this.curMode); 
		}
		var t = new Task();
		alert(t.cid);
		setContent(html);
		showModalWindow();
	};
	
	DialogManager.prototype.showCreateDialog = function(_grid, _totalMode){
		this.totalMode = _totalMode;
		this.grid = _grid;
		this.bbModel =  _grid.collection.at(_recId);
		
		if(lib.mode.canRead(this.totalMode)){
			this.curMode = 'R';
		}else{
			alert('Can not READ !!! Permisions denied');
			return;
		}
		prepareHeader('Window header for ' + this.grid.component, this.totalMode, this.curMode);
		var readTaskView = new ReadTaskView({model : this.model});
		setContent(readTaskView.render().el);
		showModalWindow();
	};
			
	DialogManager.prototype.toUpdateMode = function(){
		if(!lib.mode.canUpdate(this.totalMode)){
			alert('Permission denied !');
			return;
		}
		this.curMode = 'U';
		
		prepareHeader('Window header for ' + this.grid.component, this.totalMode, this.curMode);
		var updateTaskView = new UpdateTaskView({model : this.model});
		setContent(updateTaskView.render().el);
		showModalWindow();
		
	};
	
	getTopButtonsHtml = function(_totalMode, _curMode){
		var html = '';
		
		html += '<button type="button" class="close" data-dismiss="modal">X</button>';
		
		// editing
		if(lib.mode.canUpdate(_totalMode)){
			if(_curMode == 'U'){
				html += '<div class="panel"><a href="javascript:dialogManager.toUpdateMode()" class="activated glyphicon glyphicon-pencil"></a></div>';
			}else{
				html += '<div class="panel"><a href="javascript:dialogManager.toUpdateMode()" class="glyphicon glyphicon-pencil"></a></div>';
			}
		}
								
		return html;
	};
	
	prepareHeader = function(_title, _globalMode, _curMode){
		var html = getTopButtonsHtml(_globalMode, _curMode);
        html += '<h4 class="modal-title">' + _title + '</h4>';
		
		// glyphicon glyphicon-pencil
		var header =  $('#modalWindow div.modal-dialog div.modal-content div.modal-header');
		header.html(html);
	};
	
	setContent = function(data){
		var content =  $('#modalWindow div.modal-dialog div.modal-content div.modal-body');
		content.html(data);
	};
	
	showModalWindow = function(){
		$('#modalWindow').modal({backdrop: 'static'});
	};
		
	
};
var dialogManager = new DialogManager();



var lib = {};

lib.mode = {
	canRead: function(_mode){
		if(!_mode){
			return false;
		}
		return _mode.indexOf('R') >= 0;
	},	
	
	canWrite: function(_mode){
		if(!_mode){
			return false;
		}
		return _mode.indexOf('W') >= 0;
	},
	
	canUpdate: function(_mode){
		if(!_mode){
			return false;
		}
		return _mode.indexOf('U') >= 0;
	},
	
	havePermissions: function(_mode, _totalMode){
		return _totalMode.indexOf(_mode) >= 0;
	},
	
	getOperationName: function(_mode){
		switch(_mode){
		case 'C'	:	return 'CREATE';
		case 'R'	:	return 'READ';
		case 'U'	:	return 'UPDATE';
		case 'D'	:	return 'DELETE';
		default		:	return 'UNKNOWN-' + _mode;
		}
	}
	
};
