// Experimental Map objects for this App
var emptySample = new Map();
// Map object with items added for a sample to do list
var listSample = new Map()
	.set('Write some awesome Javascript', false)
	.set('Learn something new with CSS', false);

// handlers for App items
var handlers = {
	
	theObj: emptySample,
	
	setObj: function(passedObj){
		handlers.theObj = passedObj;
		handlers.underlineList();
		handlers.refreshList();
	},
	
	getObj: function (){
		return this.theObj;
	},
	
	getInput: function(){
		
		var inputValue = document.querySelector('#taskInput');
		this.add(inputValue.value);
		inputValue.value = '';
	},
	
	// using the text of the task as the item key so the Map.delete method is easier to use
	add: function(newTask){
		
		this.theObj.set(newTask, false);
		this.refreshList();
	},
	
	delete: function(itemClicked){
		
		this.theObj.delete(itemClicked);
		this.refreshList();

	},
	
	setCompletion: function(itemClicked, value){
		
		this.theObj.delete(itemClicked);
		this.theObj.set(itemClicked, value);
		this.refreshList();
		
	},

	// underlines the list name when the list changes
	// Map names are hard coded in - name must be known and placed in manually
	underlineList: function(){
		if (this.theObj === emptySample){
			document.querySelector('#listOneBTN').classList.add('textUnderline');
			document.querySelector('#listTwoBTN').classList.remove('textUnderline');
		} 
		if (this.theObj === listSample) {
			document.querySelector('#listOneBTN').classList.remove('textUnderline');
			document.querySelector('#listTwoBTN').classList.add('textUnderline');
		} 
	},
	
	refreshList: function(){
		
		var getUL = document.querySelector('ul');
		
		if (this.theObj.size == 0){
			getUL.innerHTML = '';
			var listName = document.querySelector('.textUnderline').textContent;
			var newLI = document.createElement('li');
			newLI.innerHTML = `<li class="emptyListNotice">Your ${listName} is Empty</li>`;
			getUL.appendChild(newLI);	
		} else {
			getUL.innerHTML = '';

				for (var value of this.theObj.entries()) {
					var newLI = document.createElement('li');
						if (value[1] === false){
							newLI.innerHTML = `<span class="taskItem">${value[0]}</span> <i>delete</i>`;
						} else {
							newLI.innerHTML = `<span class="complete">${value[0]}</span> <i>delete</i>`;
						}
					getUL.appendChild(newLI);
				};
		}
		
	}

};

// sets the listeners for the App
var listeners = {
	
	setListener: function(passedObj){
		
		const inputBox = document.querySelector('#taskInput');
		var getUL = document.querySelector('.toDos');
		
		inputBox.addEventListener('keydown', function(event) {
			if (event.key === 'Enter') {
				handlers.getInput();
			}
		});
		
		getUL.addEventListener('click', function(event){
			var itemClicked = event.target.parentElement.querySelector('span').textContent;
			if (event.target.textContent === 'delete'){
				handlers.delete(itemClicked);
			}
			if (event.target.className === 'taskItem'){
				handlers.setCompletion(itemClicked, true);
			}
			if (event.target.className === 'complete'){
				event.target.classList.add('taskItem');
				event.target.classList.remove('complete');
				handlers.theObj.set(itemClicked, false)
				handlers.refreshList();
			}
			
		});
	}
};

// sets the list used (the object) on page load.
handlers.setObj(emptySample);
listeners.setListener(handlers.getObj());
