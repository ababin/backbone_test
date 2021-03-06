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
	
	projectsGrid = gridManager.createProjectsGrid();
	
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
			fixHeight: true});
	},
	
	createProjectsGrid: function(){
		return new CuteGrid({
			component:'projectsGrid',
			container: '#right_content', 
			collection: pagedProjects,
			itemClass: 'Project',
			caption: 'Projects !!!',
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
	this.originalBbModel;
	this.typedObjects;
	
	// mode can be follows: CRUD  
	
	DialogManager.prototype.showCard = function(_grid, _recId, _totalMode, _mode){
		// check permissions
		if(!lib.mode.havePermissions(_mode, _totalMode)){
			alert('!!! Permisions denied for ' + lib.mode.getOperationName(_mode));
			return;
		}
		
		this.grid = _grid;
		this.totalMode = _totalMode;
		this.curMode = _mode; 
		if(_mode == 'C'){
			this.bbModel = new window[_grid.itemClass]();
		}else if (_mode == 'U'){
			this.originalBbModel = this.bbModel.clone(); 
		}else{
			this.bbModel = _grid.collection.at(_recId);
		}
		 
		this.typedObjects = new Array();
				
		
		
		prepareHeader('Window header for ' + this.grid.component, this.totalMode, this.curMode);
		
		var html = '';
		for(var i =0; i < Admin.model[_grid.itemClass].viewCard.length; i++){
			var field = Admin.model[_grid.itemClass].viewCard[i].field;
			var typedObject = Admin.types.Factory.createType(this.bbModel, _grid.itemClass , field); 
			this.typedObjects.push(typedObject);
			html += typedObject.renderForCard(this.curMode); 
		}
		setContent(html);
		prepareButtons(_mode);
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
		this.curMode = 'U';
		this.showCard(this.grid, -1, this.totalMode, this.curMode);
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
	
	prepareButtons = function(_mode){
		var container = $('#modalWindow div.modal-dialog div.modal-content div.modal-footer');
		var html = '';
		if(_mode == 'R'){
			//html = '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';
		}else if(_mode == 'C'){
			html = '<button type="button" class="btn btn-success" onclick="dialogManager.save()">Save</button>';
			//html += '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';
		}
		
		
		container.html(html);
	};
	
	showModalWindow = function(){
		$('#modalWindow').modal({backdrop: 'static'});
	};
	
	DialogManager.prototype.closeModalWindow = function(){
		$('#modalWindow').modal('hide');
	};
	
	DialogManager.prototype.save = function(){
		var bbModel = this.bbModel;
		this.typedObjects.forEach(function(element, index){
			// obtain value
			element.obtainValueFromHtml();
			
			// validate
			//element.validate();
			
			// set values
			bbModel.set(element.fieldName , element.internalObj);
			
		});
		
		var dm = this;
		var grid = this.grid;
		this.bbModel.save({},{
    		success: function(model, result, xhr){
    			//alert('success');
    			dm.closeModalWindow();
    			grid.refresh();
    			
    		},
    		
    		error: function(model, result, xhr){
    			alert('error');
    		},
    	});
		
		//closeModalWindow();
		
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
