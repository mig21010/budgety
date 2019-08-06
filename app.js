var budgetController = (function(){

	var Expense = function(id, description, value){
		this.id = id;
		this.description = description;
		this.value = value;
	};

	var Income = function(id, description, value){
		this.id = id;
		this.description = description;
		this.value = value;
	};


	var data = {
		allItems: {
			exp: [],
			inc: []
		},
		totals: {
			exp: 0,
			inc: 0
		}
	};

	return {
		addItem: function(type, des, val) {

			var newItem, ID;

			if (data.allItems[type].lenght > 0) {

				ID = data.allItems[type][data.allItems[type].length - 1]. id +1;
			} ele {

				ID = 0;
			}
			if (type === 'exp') {

				newItem new Expense(ID, des, val);
			} else {

				newItem new Income(ID, des, val);
			}

			data.allItems[type].push(newItem);

			return newItem;
		}
	};
})();

var UIController = (function() {
	//
	var DOMstrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		inputbtn: '.add__btn'
	}
	return {
		getInput: function() {
			return {
				type: document.querySelector(DOMstrings.inputType).value,
				description: document.querySelector(DOMstrings.inputDescription).value,
				value: document.querySelector(DOMstrings.inputValue).value
			};
		},

		getDOMstrings: function() {
			return DOMstrings;
		}
	};
})();


var controller = (function (budgetCtrl, UICtrl) {

	var setupEventListeners = function() {

		var DOM = UICtrl.getDOMstrings();
		document.querySelector(DOM.inputbtn).addEventListener('click', ctrlAddItem);

		document.addEventListener('keypress', function(event) {

			if (event.keyCode === 13 || event.which === 13) {

				ctrlAddItem();
			}
		});

	}
	var ctrlAddItem = function() {
		//Get the field input data
		var input, newItem;

		input = UICtrl.getInput();

		newItem = budgetCtrl.addItem(input.type, input.description, input.value);
	};

	return {
		init: function() {
			console.log('Application has started');
			setupEventListeners();
		}
	};


})(budgetController, UIController);

controller.init();