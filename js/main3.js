var Book = Backbone.Model.extend({
    initialize: function() {
        console.log('Book was initialized');
    },
    defaults: {
        title: 'No title',
        author: 'unknown',
        releaseDate: 2011,
        description: ''
    }
});


//создаем экземпляр модели
var oBook = new Book({ title: 'Alice in Wonderland', author: 'Lewis Caroll' });

// считываем атрибут title
var sBookTitle = oBook.get('title');

// устанавливаем атрибут releaseDate
oBook.set({ releaseDate: '1865'  });



var BooksCollection = Backbone.Collection.extend( {  
    model : Book,  
    old : function() {  
        return this.filter(function(book) {   
            return book.get('releaseDate') < 1900;   
    	});  
    }
});


var oBooks = new BooksCollection();
oBooks.get(0);




var BooksCollection = Backbone.Collection.extend( {  
    model: Books,  
    url: '/books' 
} );  
  
var oBooks = new BooksCollection();  
oBooks.fetch();






var BookView = Backbone.View.extend({
    tagName: 'div',
    className: 'book-item',
    template: _.template($('#bookTemplate').html()),
	
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});







