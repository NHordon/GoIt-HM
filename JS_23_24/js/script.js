function Model(data) {
	var self = this;
	self.data = data;
	self.addItem = function(item) {
		if (item.length === 0) { //if empty line come we have a check
			return;
    }
		self.data.push(item);
		return self.data;
	}
	self.removeItem = function(item) {
		if (index === -1) {
			return;
		}
		var index = self.data.indexOf (item); //save index
		self.data.splice(index, 1); //find index and splice this item
		return self.data;
	}
}
function View(model) {
	var self = this; //save context
	function init() {
		var wrapper = tmpl($('#wrapper-template').html()); //template is added

		$('body').append(wrapper);
		self.elements = {
			input: $('.item-value'),
			addBtn: $('.item-add'),
			listContainer: $('.item-list')
		};
		self.renderList(model.data);
	};
	self.renderList = function(data) {
		var list = tmpl($('#list-template').html(), {data: data});
		self.elements.listContainer.html(list);
	};
	init();
}

function Controller(model, view) {
	var self = this;

	view.elements.addBtn.on('click', addItem);
	view.elements.listContainer.on('click', '.item-delete', removeItem);

	function addItem() { // standart jq callback
		var newItem = view.elements.input.val();
		model.addItem(newItem);
		view.renderList(model.data); //change list with new data
		view.elements.input.val(''); //clear input
	}
	function removeItem() {
		var item = $(this).attr('data-value');
		model.removeItem(item);
		view.renderList(model.data);

	}
}
$(function() {
	var firstToDoList = ['learn html', 'learn js', 'learn css'];
	var model = new Model(); //model's initialising
	var view = new View(model);
	var Controller = new Controller(model, view);
});