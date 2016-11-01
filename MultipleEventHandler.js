/* Dependencies : jQuery
 */
var ngyv = ngyv || {};

(function() {
'use strict';
//__________
ngyv.MultipleEventHandler = function(options) {
	
	var self = this;
	
	// __ Private variables (and methods)
	var _ = {};

	// stores {elementIdentifier: { multipleEventsAsStringCommaSeparated : eventHandler }}
	// to keep track and unbind the event handler
	_.multipleEventHandlers = {};

	// stores {elementIdentifier: { multipleEventsAsStringCommaSeparated : indexOfLastTurnedOffEvent }}
	_.turnedOffHandler = {};

	_.doNothingHandler = function() {
		e.stopPropagation();
		e.preventDefault();
		return false;
	};
	
	// elementIdentifier : str ; multipleEvents : [] ; eventHandler : function(e)
	_.addToMultipleEventHandler = function(elementIdentifier, multipleEvents, eventHandler) {
		if(_.multipleEventHandlers[elementIdentifier] === undefined || _.multipleEventHandlers[elementIdentifier] == null) {
			_.multipleEventHandlers[elementIdentifier] = {};
		}
		var multipleEventsStr = multipleEvents.toString();
		if(_.multipleEventHandlers[elementIdentifier].multipleEventsStr  != undefined || _.multipleEventHandlers[elementIdentifier].multipleEventsStr != null){
			console.log('Will override existing event handler stored');
		}
		_.multipleEventHandlers[elementIdentifier].multipleEventsStr = eventHandler;
	};

	_.getLastIndexTurnedOff = function(elementIdentifier, multipleEvents) {
		var multipleEventsStr = multipleEvents.toString();
		return (_.turnedOffHandler[elementIdentifier].multipleEventsStr === undefined || _.turnedOffHandler[elementIdentifier].multipleEventsStr == null) ? 
				multipleEvents.length : _.turnedOffHandler[elementIdentifier].multipleEventsStr;
	};

	_.setLastIndexTurnedOff = function(elementIdentifier, multipleEvents, lastIndex) {
		var multipleEventsStr = multipleEvents.toString();
		if(_.turnedOffHandler[elementIdentifier].multipleEventsStr === undefined || _.turnedOffHandler[elementIdentifier].multipleEventsStr == null || _.turnedOffHandler[elementIdentifier].multipleEventsStr > lastIndex) {
			_.turnedOffHandler[elementIdentifier].multipleEventsStr = lastIndex;
		}
	};

	_.getMultipleEventHandler = function(elementIdentifier, multipleEvents) {
		var multipleEventsStr = multipleEvents.toString();
		return _.multipleEventHandlers[elementIdentifier].multipleEventsStr;
	};

	_.createMultipleEventHandler = function(elementIdentifier, actualHandler, multipleEvents) {
		return function(e){
			var indexOfEvent = multipleEvents.indexOf(e.type);
			if(indexOfEvent < multipleEvents.length - 1) {
				var lastIndex = _.getLastIndexTurnedOff();
				for(var i = indexOfEvent + 1; i < lastIndex; i++){
					$(elementIdentifier).off(multipleEvents[i], _.getMultipleEventHandler(elementIdentifier, multipleEvents)).on(multipleEvents[i], _.doNothingHandler);
				}

				_.setLastIndexTurnedOff(elementIdentifier, multipleEvents, lastIndex);
			}
			
			actualHandler(e);
		};
	};

	// __ Public methods
	// NOTE: multipleEvents is an array and the order matters. The event in lower order (higher index) will be turned off when an event of higher
	self.attachMultipleEventHandler = function(elementIdentifier, actualHandler, multipleEvents) {
		// Note: can only store one such case for the element
		_.addToMultipleEventHandler(elementIdentifier, multipleEvents, _.createMultipleEventHandler(elementIdentifier, actualHandler, multipleEvents));

		for(i in multipleEvents){
			$(elementIdentifier).on(multipleEvents[i], _.getMultipleEventHandler(elementIdentifier, multipleEvents));
		}
	};

	
	// __ Constructor 
	(function(){

		// Optional variables (and methods) accessible
		if(options) 
		{
			for(var key in options) {
				if(!options.hasOwnProperty(key) || options[key] == null) {
					continue;
				}
				self.key = options[key];
			}
		}
		
	})();
};

//__________
})();

//Example of usage
// var meh = new ngyv.MultipleEventHandler();
// var actualHandler = function(e) {
// 	console.count(e + ' do the thing.');
// };
// meh.attachMultipleEventHandler('#element', actualHandler, ['touchstart', 'click']);

