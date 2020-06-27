var TodoListController = (function(){

    var TodoItem = function(id, todoLabel){
        this.id = id;
        this.todoLabel = todoLabel;
    };

    var itemsArray = [];

    //function to add new Item
    var addNewItem = function(input){
        if(itemsArray.length === 0){
            ID = 0;
        }
        else{
            ID = itemsArray[itemsArray.length - 1].id + 1;
        }
        var newItem = new TodoItem(ID, input);
        itemsArray.push(newItem);
        return newItem;
    }

    return{
        addItem : function(input){
            return addNewItem(input);
        }
    }

})();

var UIController = (function(){

    //DOM Elements
    var DOMStrings = {
        inputText : '#myInput',
        addButton : '.addBtn',
        list : '#myUL',
        deleteBtn : '.close'
    };

    //function that display updates
    var displayUpdates = function(newItem){
        var html, newHtml;
        html = '<li id = todo-%id%>%todoLabel%<span><button class="close">x</span></button></li>';
        newHtml = html.replace('%todoLabel%', newItem.todoLabel);
        newHtml = newHtml.replace('%id%', newItem.id);
        document.querySelector(DOMStrings.list).insertAdjacentHTML('beforeend', newHtml);
    };

    //function to take input
    var getInput = function(){
        getTodo = document.querySelector(DOMStrings.inputText).value;
        return getTodo;
    };

    var clearField = function(){
        document.querySelector(DOMStrings.inputText).value = '';
        document.querySelector(DOMStrings.inputText).focus();
    };

    var updateUIAfterDeletion = function(ID){
        document.querySelector('#todo-' + ID).classList.add('checked');
    };

    return{

        //function to clear field
        clearField : function(){
            clearField();
        },

        //function to return DOMStrings
        getDOMStrings : function(){
            return DOMStrings;
        },

        getInput : function(){
            return getInput();
        },

        updateUI : function(newItem){
            displayUpdates(newItem);
        },

        updateAfterDeletion : function(ID){
            updateUIAfterDeletion(ID);    
        }
    }

})();

var AppController = (function(TodoCtrl, UICtrl){

    //Importing DOMStrings
    var DOMStrings = UICtrl.getDOMStrings();

    //Starting Event Listners
    var startEventListener = function(){
        //Add button event handler
        document.querySelector(DOMStrings.addButton).addEventListener('click', addEventHandler);

        //Enter key pressed event handler
        document.addEventListener('keypress', function(event){
            if(event.code === 'Enter' || event.charCode === 13){
                addEventHandler();
            }
        });

        //Delete button handler
        document.querySelector(DOMStrings.list).addEventListener('click', deleteEventHandler);
    }

    //function to handle delete events
    var deleteEventHandler = function(event){
        
        //1. Get the ID of the element to be deleted
        itemID = event.target.parentNode.parentNode.id;
        if(itemID !== 'myUL' || itemID === ''){
            ID = parseInt(itemID.split('-')[1]);

            //2. Update Item in UI
            UICtrl.updateAfterDeletion(ID);
        }        
    }

    //Function to handle add events
    var addEventHandler = function(){
        //1. Take input in UI
        var input = UICtrl.getInput();
        
        //2. Take care of false inputs
        if(input !== ''){
            //3. Add the input in Data Structure
            var newItem = TodoCtrl.addItem(input);
            
            //4. Add those input in UI List
            UICtrl.updateUI(newItem);

            //5. Clearing the fields and change focus
            UICtrl.clearField();
        }        
    }

    return{
        //Function that initiates the application
        init : function(){
            startEventListener();    
        }
    }
})(TodoListController, UIController);

//Application Trigger
AppController.init();