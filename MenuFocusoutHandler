/* Dependencies : jQuery
 */
var ngyv = ngyv || {};

(function() {
'use strict';
//__________
ngyv.MenuFocusoutHandler = function(options) {
	
	var self = this;
	self.eventListener = 'touchstart mouseup';
	
	// __ Private variables (and methods)
	var _ = {};
	// stores object (*) {menu: '.ngyv-menu-selector', trigger: '.ngyv-menu-trigger', close: closeHandler}
	_.menuItems = []; 
	_.menuKey = {};

	_.validate = function(item) {
		return (item != undefined && item != null);
	};

	_.validateMenuItem = function(menuItem) {
		if(_.validate(menuItem)) {
			return (_.validate(menuItem.menu) && _.validate(menuItem.trigger) && _.validate(menuItem.close));
		}
		return false;
	};

	_.attachEventListenerToDocument = function() {
		$(document).on(self.eventListener, function(e){
			for(var key in _.menuKey) {
				var menuItem = _.menuItems[_.menuKey[key]];

				var $triggerDiv = $(menuItem.trigger);
				var $menuDiv = $(menuItem.menu);

				if(!$menuDiv.is(e.target) &&    // if the click wasn't on the menu
       				$menuDiv.has(e.target).length == 0 && // nor is it on the descendant of the menu div
       				!$triggerDiv.is(e.target) && $triggerDiv.has(e.target).length == 0) { 
					
				 	menuItem.close(e);
				}
			}
		});
	};

	// __ Public methods

	// add it to list to monitor
	self.addMenuItem = function(menuSelector, triggerSelector, closeHandler) {
		if(_.menuItems.length == 0) {
			_.attachEventListenerToDocument();
		}
		if(_.validate(_.menuKey[menuSelector])) {
			console.log('A menu item with selector ( ' + menuSelector + ' ) already exists. Will be overridden.');
			_.menuItems.splice(_.menuKey[menuSelector], 1); 
		}
		_.menuItems.push({menu: menuSelector, trigger: triggerSelector, close: closeHandler});
		_.menuKey[menuSelector] = _.menuItems.length - 1;
	};

	// must be array containing objects (*)
	self.addMenuItems = function(menuItemArray) {
		if(menuItemArray != null && menuItemArray != undefined && menuItemArray.length) {
			for(var i in menuItemArray) {
				if(_.validateMenuItem(menuItemArray[i])) {
					self.addMenuItem(menuItemArray[i].menu, menuItemArray[i].trigger, menuItemArray[i].close);
				}
			}
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
// var mf = new ngyv.MenuFocusoutHandler();
// mf.addMenuItem('#search-more-filters-trigger-div', '#show-more-filters-menu-div', function(e){$('#show-more-filters-menu-div').slideUp();})
