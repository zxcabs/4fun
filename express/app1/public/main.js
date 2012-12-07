var render = (function () {
	return function (view, data) {
		$('#content').html(views[view](data));
	}
}());


$(function () {
	var isSupport = ($.browser.msi && /^[\d]{2,}[\d\.]+$/.test($.browser.version)) || $.browser.webkit || $.browser.mozilla;
	
	if (isSupport) {
		$('a').live('click', function () {
			var el = $(this),
				href = el.attr('href');
			
			$.get(href, function(result) {
				History.pushState(result, '', href)
			}, 'json');
			
			return false;
		});
	
	
		History.Adapter.bind(window,'statechange', function() {
			var state = History.getState(),
				obj = state.data;
			render(obj.view, obj.data);
		});
	}
});