

CuteGrid = function (map){
	
	// DOM-element where will be located all rendered content
	this.container = $(map.container);
	
	// component name. Used for reference from javascript code
	this.component = map.component;
	
	// backbone collection
	this.collection = map.collection;
	
	// table caption. If empty or undefined, will be without caption
	this.caption = map.caption;
	
	// Set TRUE if you need to show row index in the first column
	this.needShowRowIndex = map.needShowRowIndex != undefined ? map.needShowRowIndex : false;
	
	// set TRUE if you want to fix table rows count
	this.fixHeight = map.fixHeight != undefined ? map.fixHeight : false;
	
	// columns meta
	this.columns = map.columns;
	
	// page size (and table size too)
	this.pageSize = 5;
			
	this.collectionInited = false;
	
	// for keep orders
	this.orders = {};
	
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
		
		var preparedParams = {};
		// page
		preparedParams.page = pageNum;
		// order
		if(this.collection.orderMeta != undefined){
			for(var key in this.collection.orderMeta){
				preparedParams['orderBy_'+key] = this.collection.orderMeta[key];
			}
		}
		
		this.collection.fetch({
    		data: $.param(preparedParams),
    		success: function(context){
    			self.render();
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
		var itemIndex = 0;
		this.collection.each(function(item){
			
			// prepare data
			html += '<tr class="data" onclick="dialogManager.showDialogFor(' + this.component + ', ' + itemIndex + ')">';
			itemIndex++;
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
		
		var component = this.component;
		var orderMeta = this.collection.orderMeta;
		
		if(this.needShowRowIndex){
			html += '<th>#</th>';
		}
		this.columns.forEach(function(val, index){
			// width
			var width = '';
			if(val['width']){
				width = ' width="' + val['width'] + '"';
			}
			// order
			var order = '';
			if(val['orderEnabled'] === true && orderMeta != undefined){
				var imgClass = "glyphicon glyphicon-sort notused";
				
				if(orderMeta[val['modelAttr']] > 0){
					imgClass = "glyphicon glyphicon-sort-by-attributes";
				}else if(orderMeta[val['modelAttr']] < 0){
					imgClass = "glyphicon glyphicon-sort-by-attributes-alt";
				}
				order ='<a href="javascript:' + component + '.doOrder(' + index + ')" class="' + imgClass + '"></a>';
				
			}
			// total HTML
			html += '<th' + width + '>' + val['title'] + order + '</th>'; 
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
	
	// order =================================================================================================
	CuteGrid.prototype.doOrder = function(index){
		var orderMeta = this.collection.orderMeta;
		var attrName = this.columns[index]['modelAttr']; 
		
		if(orderMeta[attrName] != undefined){
			orderMeta[attrName] ++;
			if(orderMeta[attrName] > 1){
				orderMeta[attrName] = -1;
			}
		}else{
			orderMeta[attrName] = 1;
		}
		this.fetch();
	};
	
	
};

