var budgetController = (function(){

	var Expense = function(id, description, value) {
		this.id = id;
		this.description = description;
		this.value = value;
	};

	var Income = function(id, description, value) {
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
				console.log(ID);
			} else {

				ID = 0;
			}
			if (type === 'exp') {

				newItem = new Expense(ID, des, val);
			} else {

				newItem = new Income(ID, des, val);
			}

			data.allItems[type].push(newItem);

			return newItem;
		},

		testing: function() {
			console.log(data);
		}
	};
})();

var UIController = (function() {
	//
	var DOMstrings = {
		inputType: '.add__type',
		inputDescription: '.add__description',
		inputValue: '.add__value',
		inputbtn: '.add__btn',
		incomeContainer: '.income__list',
		expenseContainer: '.expenses__list'
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
		},

		addListItem: function(obj, type) {
			var html, newHtml, element;
			//create HTML string with some actual data
			if (type === 'inc') {
				element = DOMstrings.incomeContainer;

				html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			} else if (type === 'exp') {
				element = DOMstrings.expenseContainer;

				html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
			}
			//replace the placeholder text with some actual data
			newHtml = html.replace('%id%', obj.id);
			newHtml = newHtml.replace('%description%', obj.description);
			newHtml = newHtml.replace('%value%', obj.value);
			//Insert HTML into the DOM
			document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
		},

		clearFields: function() {
			var fields, fieldsArr;
			fields = document.querySelectorAll(DOMstrings.inputDescription+ ', ' + DOMstrings.inputValue);

			//fieldsArr = Array.prototype.slice.call(fields);

			fields.forEach(function(current, index, array) {
				current.value = "";
			});

			fields[0].focus();
			/*console.log(fieldsArr);*/
			//console.log(fields);
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
				console.log('ok');
			}
		});

	}
	var ctrlAddItem = function() {
		//Get the field input data
		var input, newItem;
		//1. Get field input data
		input = UICtrl.getInput();
		//2. Add the item to the budget controller
		newItem = budgetCtrl.addItem(input.type, input.description, input.value);
		//3. Add the item  to the UI
		UICtrl.addListItem(newItem, input.type);
		//4. Clear the fields
		UICtrl.clearFields();
		//
	};

	return {
		init: function() {
			console.log('Application has started');
			setupEventListeners();
		}
	};


})(budgetController, UIController);

controller.init();