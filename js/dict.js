dict = {};

// TYPES:   id, number, string, text

dict.task = {
		
	fields: [{name: 'id', title:'ID', type: 'id', readonly: true},
	         {name: 'title', title:'TITLE', type: 'string' },
	         {name: 'desc', title:'DESC', type: 'text'}
	        ]
		
};

dict.project = {
		
		fields: [{name: 'id', title:'ID', type: 'id', readonly: true},
		         {name: 'name', title:'NAME', type: 'string' },
		         {name: 'desc', title:'DESC', type: 'text'}
		        ]
			
	};

