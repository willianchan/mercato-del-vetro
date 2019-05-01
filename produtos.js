/*var spy = new Gumshoe('#my-awesome-nav a');*/
var spy = new Gumshoe('#navBar', {
	nested: true,
	nestedClass: 'active-parent'
});

// Get the header
var header = document.querySelector('#navBar');

// Initialize Gumshoe
var spy = new Gumshoe('#navBar a', {
	offset: function () {
		return header.getBoundingClientRect().height;
	}
});

// Listen for activate events
document.addEventListener('gumshoeActivate', function (event) {

	// The list item
	var li = event.target;

	// The link
	var link = event.detail.link;

	// The content
	var content = event.detail.content;

}, false);

var spy = new Gumshoe('#navBar a');
spy.setup();

var spy = new Gumshoe('#navBar a');
spy.detect();
