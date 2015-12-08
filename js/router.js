var GlobalRouter = Backbone.Router.extend({
			
	routes: {
		'm1': 'menu_m1',
		'm2': 'menu_m2',
		'm3': 'menu_m3',
		'm4': 'menu_m4',
		'm5': 'menu_m5',
		'newTask': 'newTaskRoute',
		'loadTasks': 'loadTasksRoute',
		'createNewTask': 'createNewTaskRoute',
		'*actions': 'globalRoute',
		
    },
    	    	    
    globalRoute: function(action){
    	alert('global route: ' + action);
    },
    	    	    
    menu_m1: function(){
    	leftMenuView.refreshMenu('m1');
    },
    
    menu_m2: function(action){
    	leftMenuView.refreshMenu('m2');
    },
    
    menu_m3: function(action){
    	leftMenuView.refreshMenu('m3');
    },
    
    menu_m4: function(action){
    	leftMenuView.refreshMenu('m4');
    },
    
    menu_m5: function(action){
    	leftMenuView.refreshMenu('m5');
    },
    
    newTaskRoute: function(action){
    	//leftMenuView.refreshMenu('newTask');
    	//var template = _.template($('#tasks-template').html(), {tasks: tasks.models});
    	//$("#right_content").html(template);
    	
    	leftMenuView.refreshMenu('newTask');
    	var task = new Task();
    	var tpl = _.template($('#task-template').html(), {task: task});
    	$("#right_content").html(tpl);
    	
    	
    	
    	
    },
    
    loadTasksRoute: function(action){
    	tasks.fetch({
    		success: function(context){
    			leftMenuView.refreshMenu('loadTasks');
    			if(!tasksView)tasksView=new TasksView();
    			tasksView.render();
    		},
    		error: function(er, er2){
    			alert('error');
    		}
    	});
    },
    
    createNewTaskRoute: function(){
    	var newTask = new Task({title: $('#taskTitle').val(), desc: $('#taskDesc').val()});
    	newTask.save();
    }
    
    
    
    	    
});