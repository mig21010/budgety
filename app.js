var budgetController = (function() {

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

	var calculateTotal = function(type) {

		var sum = 0;
		data.allItems[type].forEach(function(cur){
			sum += cur.value;
		});
		data.totals[type] = sum;
	};

	var data = {
		allItems: {
			exp: [],
			inc: []
		},
		totals: {
			exp: 0,
			inc: 0
		},
		budget: 0,
		pertentage: -1
	};

	return {
		addItem: function(type, des, val) {

			var newItem, ID;

			if (data.allItems[type].length > 0) {

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

		calculateBudget: function() {

			//Calculate total income and expenses
			calculateTotal('exp');
			calculateTotal('inc');
			//Calculate the budgat income -expenses
			data.budget = data.totals.inc - data.totals.exp;
			//calculate the porcentage of income that we spent
			if (data.totals.inc > 0) {

				data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
			} else {
				data.percentage = -1;
			}
		},

		getBudget: function() {

			return {
				budget: data.budget,
				totalInc: data.totals.inc,
				totalExp: data.totals.exp,
				percentage: data.percentage
			}
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
		expenseContainer: '.expenses__list',
		budgetLabel: '.budget__value',
		incomeLabel: '.budget__income--value',
		expensesLabel: '.budget__expenses--value',
		percentageLabel: '.budget__expenses--percentage',
		container: '.container'
	}
	return {
		getInput: function() {
			return {
				type: document.querySelector(DOMstrings.inputType).value,
				description: document.querySelector(DOMstrings.inputDescription).value,
				value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
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

				html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
			} else if (type === 'exp') {
				element = DOMstrings.expenseContainer;

				html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
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
		},

		displayBudget: function(obj) {

			document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
			document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
			document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;

			if (obj.percentage > 0) {

				document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
			} else {

				document.querySelector(DOMstrings.percentageLabel).textContent = '---';
			}
		}
	};
})();

/*GLOBAL APP CONTROLLER*/
var controller = (function (budgetCtrl, UICtrl) {

	var setupEventListeners = function() {

		var DOM = UICtrl.getDOMstrings();
		document.querySelector(DOM.inputbtn).addEventListener('click', ctrlAddItem);

		document.addEventListener('keypress', function(event) {

			if (event.keyCode === 13 || event.which === 13) {

				ctrlAddItem();
				/*console.log('ok');*/
			}
		});

		document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

	};

	var updateBudget = function() {

		//1. Calculate thebudget
		budgetCtrl.calculateBudget();
		//2.REturn the budget
		var budget = budgetCtrl.getBudget();
		//3.Display the budget on the UI
		console.log(budget);
		UICtrl.displayBudget(budget);
	};

	var ctrlAddItem = function() {
		//Get the field input data
		var input, newItem;
		//1. Get field input data
		input = UICtrl.getInput();
		if (input.description !== "" && !isNaN(input.value) && input.value > 0) {

			//2. Add the item to the budget controller
			newItem = budgetCtrl.addItem(input.type, input.description, input.value);
			//3. Add the item  to the UI
			UICtrl.addListItem(newItem, input.type);
			//4. Clear the fields
			UICtrl.clearFields();
			//5. Calculate and update budget
			updateBudget();
		}
	};

	var ctrlDeleteItem = function(event) {
		var itemID;
		itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;

		if (itemID) {

			splitID = itemID.split('-');
		}


		console.log(event.target.parentNode.parentNode.parentNode.parentNode.id);
	};

	return {
		init: function() {
			console.log('Application has started');
			setupEventListeners();
			UIController.displayBudget({
				budget: 0,
				totalInc: 0,
				totalExp: 0,
				percentage: -1
			});
		}
	};


})(budgetController, UIController);

controller.init();