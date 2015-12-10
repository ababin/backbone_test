

CuteGrid = function (map){
	
	this.container = $(map.container);
	
	this.component = map.component;
	// backbone collection
	this.collection = map.collection;
	
	this.caption = map.caption;
	
	this.columns = [
	                {title: 'ID', modelAttr:'id'},
	                {title: 'TITLE', modelAttr:'title'},
	                {title: 'DESC', modelAttr:'desc'}
	                ];
	
	this.pageSize = 5;
	
	this.collectionInited = false;
	
	// show =====================================================================================================
	CuteGrid.prototype.show = function(){
		if(!this.collectionInited){
	    	this.fetch();
		}
	};
	
	// fetch =====================================================================================================
	CuteGrid.prototype.fetch = function(){
		var self = this;
		var pageNum = this.collection.pageMeta.page;
		this.collection.fetch({
    		data: $.param({ page: pageNum}),
    		success: function(context){
    			self.render();
    			//this.prototype.render();	    			
    		},
    		error: function(er, er2){
    			alert('error');
    		}
    	});
	};
		
	// render !!!! =================================================================================================
	CuteGrid.prototype.render = function(){
		
		var html = '<table class="table table-hover cuteGrid">';
		html += this.prepareTableCaption();
		html += this.prepareTableHeader();
		html += this.prepareTableData();		
		html += this.prepareTableFooter();
		html += this.prepareTablePagination();
		html += '</table>';
		
		this.container.html(html);
	};
	
	CuteGrid.prototype.prepareTableData = function(){
		var html = '';
		this.collection.each(function(item){
			
			// prepare data
			html += '<tr>';
			this.columns.forEach(function(val, index){
				modelAttr = val['modelAttr'];
				html += '<td>' + item.attributes[modelAttr] + '</td>';
			});
			html += '</tr>';
		}, 
		this);	
		return html;
	};
	
	CuteGrid.prototype.prepareTableHeader = function(){
		var html = '<tr>';
		this.columns.forEach(function(val, index){
			html += '<th>' + val['title'] + '</th>'; 
		});
		html += '</tr>';
		return html;
	};
	
	CuteGrid.prototype.prepareTableCaption = function(){
		if(this.caption != null && this.caption != undefined){
			return '<tr class="cuteGridCaption"><th colspan="' + this.columns.length + '">' + this.caption + '</th></tr>'; 
		}
		return '';
	};
	
	CuteGrid.prototype.prepareTableFooter = function(){
		return '<tr class="cuteGridFooter"><td colspan="' + this.columns.length + '">' + 
		'Page: ' + this.collection.pageMeta.page + '/' + this.pagesCount() + ' (Total records: ' + this.collection.pageMeta.total + ')' +   
		'</td></tr>';
	};
	
	CuteGrid.prototype.prepareTablePagination = function(){
		
		return '<tr class="cuteGridPagination"><td colspan="' + this.columns.length + '">' 
		+ '<input type="button" onclick="javascript:'+ this.component + '.previous()" value="PREVIOUS" />'
		+ '<input type="button" onclick="javascript:'+ this.component + '.next()" value="NEXT" />'
		+ '</td></tr>';
	};
	
	// next =================================================================================================
	CuteGrid.prototype.next = function(){
		this.collection.pageMeta.page++;
		this.fetch();
	};
	
	// next =================================================================================================
	CuteGrid.prototype.previous = function(){
		this.collection.pageMeta.page--;
		this.fetch();
	};
	
	// next =================================================================================================
	CuteGrid.prototype.pagesCount = function(){
		var total = this.collection.pageMeta.total;
		var pageSize = this.collection.pageMeta.pageSize; 
		if( total % pageSize > 0){
			return Math.floor(total / pageSize) +1; 
		}else{
			return Math.floor(total / pageSize);
		}
	};
	
	
};