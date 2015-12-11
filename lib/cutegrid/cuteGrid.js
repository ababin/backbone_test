

CuteGrid = function (map){
	
	this.container = $(map.container);
	
	this.component = map.component;
	
	// backbone collection
	this.collection = map.collection;
	
	this.caption = map.caption;
	
	this.needShowRowIndex = map.needShowRowIndex != undefined ? map.needShowRowIndex : false;
	
	this.fixHeight = map.fixHeight != undefined ? map.fixHeight : false;
			
	this.columns = [
	                {title: 'ID', modelAttr:'id', width: '50px'},
	                {title: 'TITLE', modelAttr:'title', width: '100px'},
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
	
	// reshow =====================================================================================================
	CuteGrid.prototype.reshow = function(){
		this.fetch();
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
		html += '</table>';
		
		this.container.html(html);
	};
	
	CuteGrid.prototype.prepareTableData = function(){
				
		var recordIndex = this.collection.pageMeta.pageSize* (this.collection.pageMeta.page-1) + 1;
		var needShowRecordIndex = this.needShowRowIndex;
		var html = '';
		this.collection.each(function(item){
			
			// prepare data
			html += '<tr class="data">';
			if(needShowRecordIndex){
				html+= '<td class="index">' + recordIndex + '</td>';
			}
			recordIndex++;
			this.columns.forEach(function(val, index){
				modelAttr = val['modelAttr'];
				html += '<td>' + item.attributes[modelAttr] + '</td>';
			});
									
			html += '</tr>';
		}, 
		this);
		
		if(this.fixHeight){
			var restRecords = this.collection.pageMeta.pageSize - this.collection.size();
			if(restRecords > 0){
				
				for(i=0; i<restRecords; i++){
					html += '<tr class="empty">'
						
					if(needShowRecordIndex){
						html+= '<td>E</td>';
					}
					
					this.columns.forEach(function(val, index){
						html += '<td></td>';
					});
					
					html += '</tr>';
				}
				
			}
		}
		
		return html;
	};
	
	CuteGrid.prototype.prepareTableHeader = function(){
		var html = '<tr class="header">';
		if(this.needShowRowIndex){
			html += '<th>#</th>';
		}
		this.columns.forEach(function(val, index){
			var width = '';
			if(val['width']){
				width = ' width="' + val['width'] + '"';
			}
			html += '<th' + width + '>' + val['title'] + '</th>'; 
		});
		html += '</tr>';
		return html;
	};
	
	CuteGrid.prototype.prepareTableCaption = function(){
		if(this.caption != null && this.caption != undefined){
			var columnsCount = this.columns.length;
			if(this.needShowRowIndex){
				columnsCount++;
			}
			return '<tr class="caption"><th colspan="' + columnsCount + '">' + this.caption + '<a href="javascript:' + this.component + '.reshow()" class="glyphicon glyphicon-refresh"></a></th></tr>'; 
		}
		return '';
	};
	
	CuteGrid.prototype.prepareTableFooter = function(){
		var template = 
			'<tr class="footer"><td colspan="<%=columnsCount%>">' +
			'        <span> <%=page%>/<%=pagesCount%> (<%=totalRecords%> records)</span>' +
			'    <ul class="pager">' +
			'      <li class="<% if(isFirst){print("disabled");} %>"><a href="javascript:<%=component%>.first()" class="glyphicon glyphicon-fast-backward"></a></li>' +
			'      <li class="<% if(!hasPrevious){print("disabled");} %>"><a href="javascript:<%=component%>.previous()" class="glyphicon glyphicon-chevron-left"></a></li>' +
			'      <li class="<% if(!hasNext){print("disabled");} %>"><input type="text" value="<%=page%>" onkeypress="if (event.keyCode==13){<%=component%>.goToPage(this.value);}"></li>' +
			'      <li class="<% if(!hasNext){print("disabled");} %>"><a href="javascript:<%=component%>.next()" class="glyphicon glyphicon-chevron-right"></a></li>' +
			'      <li class="<% if(isLast){print("disabled");} %>"><a href="javascript:<%=component%>.last()" class="glyphicon glyphicon-fast-forward"></a></li>' +
			'    </ul>' +
			'</tr>';
		
		var columnsCount = this.columns.length;
		if(this.needShowRowIndex){
			columnsCount++;
		}
		return _.template(template, {
			columnsCount: columnsCount,
			component: this.component,
			page: this.collection.pageMeta.page, 
			pagesCount: this.pagesCount(), 
			totalRecords: this.collection.pageMeta.total,
			hasNext: this.hasNext(),
			hasPrevious: this.hasPrevious(),
			isFirst: this.collection.pageMeta.page == 1,
			isLast: this.collection.pageMeta.page == this.pagesCount()}
		);
	};
		
	// first =================================================================================================
	CuteGrid.prototype.first = function(){
		if(this.collection.pageMeta.page != 1){
			this.collection.pageMeta.page = 1;
			this.fetch();
		}
	};
	
	// last =================================================================================================
	CuteGrid.prototype.last = function(){
		if(this.collection.pageMeta.page != this.pagesCount()){
			this.collection.pageMeta.page = this.pagesCount();
			this.fetch();
		}
	};
	
	
	// next =================================================================================================
	CuteGrid.prototype.next = function(){
		if(this.hasNext()){
			this.collection.pageMeta.page++;
			this.fetch();
		}
	};
	
	// hasNext =================================================================================================
	CuteGrid.prototype.hasNext = function(){
		if(this.collection.pageMeta.page < this.pagesCount()){
			return true;
		}
		return false;
	};
	
	// previous =================================================================================================
	CuteGrid.prototype.previous = function(){
		if(this.hasPrevious()){
			this.collection.pageMeta.page--;
			this.fetch();
		}
	};
	
	// hasPrevious =================================================================================================
	CuteGrid.prototype.hasPrevious = function(){
		if(this.collection.pageMeta.page > 1){
			return true;
		}
		return false;
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
	
	// goToPage =================================================================================================
	CuteGrid.prototype.goToPage = function(newPage){
		var n = Number(newPage);
		if(isNaN(n) 
				|| n == this.collection.pageMeta.page
				|| n < 1 || n > this.pagesCount()){
			return;
		}
		this.collection.pageMeta.page = n;
		this.fetch();
	};
	
	
};

