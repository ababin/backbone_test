
var Project = Backbone.Model.extend({
	
	url: '/rest/projects',
	
	defaults: {
		id: 0,
		name: '',
		desc: ''
	}
	
});

//PROJECT collection ====================================================================================================
var Projects = Backbone.Collection.extend({
	url: '/rest/projects',
		
	initialize: function(){
		this.model.bind('change', this.render, this);
	}
});
var projects = new Projects();

//=============================================================================================================


PagedProjects = Backbone.Collection.extend({
	url: '/rest/projects',
	
	pageMeta: {
		pageSize: 5,
		page:1,
		total:0
	},
	
	initialize: function(){
		this.model.bind('change', this.render, this);
	},

	parse: function(content){
		this.pageMeta.page = content.page;
		this.pageMeta.total=content.total;
		return content.data;
	}

});
var pagedProjects = new PagedProjects();





