/**
 * @param {param} config
 * @param {Object} [config.menuObj={"activeMenuId": "resumes","navigation":[{"title": "Home","url": "ebracho.com"},{"title": "Resumes","menuId": "resumes","subMenus":[{"title": "Technical","url": "ebracho.com/resumes/technical"},{"title": "General","url": "ebracho.com/resumes/general"}]}]}] - Object describing menu.
 * @param {String} [config.menuUrl] - Path to json file describing a menu object.
 */
function Navigation($q, $compile, $data) {
	return {
		scope: {
			config: '='
		},
		link: function(scope, element, attrs) {
			if (!scope.config.menuObj && !scope.config.menuUrl) {
				// Error: no data
			}

			$q.when($data.getData(scope.config.menuObj || scope.config.menuUrl)).then(function(menuObj) {
				buildMenu(menuObj);
			});
		
			function buildMenu(menuObj) {
				scope.menuObj = menuObj;
				scope.menuIdMap = {}
				scope.rootSubMenus = [];

				assignMenuIds(scope.menuObj.navigation, scope.menuIdMap);
				angular.forEach(scope.menuObj.navigation, function(rootMenu) {
					var subMenus = {};
					getAllSubmenus(rootMenu, subMenus);
					scope.rootSubMenus.push(subMenus);
				});
			}

			scope.toggleOpen = function(menuId) {
				if (scope.menuObj.activeMenuId === menuId) {
					scope.menuObj.activeMenuId = undefined;
				}
				else {
					scope.menuObj.activeMenuId = menuId;
				}
			};
		},
		template:
			'<ul class="bossy-navbar">' +
				'<li class="bossy-navbar-item" ng-repeat="rootMenu in menuObj.navigation">' +
					'<a class="bossy-navbar-link" ng-if="rootMenu.url" href={{rootMenu.url}}>{{rootMenu.title}}</a>' +
					'<strong ng-if="rootMenu.subMenus" ng-click="toggleOpen(rootMenu.id)">{{rootMenu.title}}</strong>' + 
					'<ul class="bossy-navbar-submenu" ng-repeat="(id, subMenu) in rootSubMenus[$index]" ng-show="menuObj.activeMenuId===id">' +
						'<lh class="bossy-navbar-submenu-header" ng-show="id!==rootMenu.id" ng-click="toggleOpen(menuIdMap[id].parentId)">{{menuIdMap[id].title}}</strong></lh>' +
						'<li class="bossy-navbar-submenu-item" ng-repeat="item in subMenu">' +
							'<a class="bossy-navbar-link" ng-if="item.url" href={{item.url}}>{{item.title}}</a>' +
							'<span ng-if="item.subMenus" ng-click="menuObj.activeMenuId=item.id">{{item.title}}</span>' +
						'</li>' +
					'</ul>' +
				'</li>' +
			'</ul>'
	};
}

Navigation.$inject = ['$q', '$compile', '$data'];

var nextId = 0;
function getUniqueId() {
    return '__' + nextId++;
}

// Assigns each subMenu an id if it doesn't already have one.
// Also maps id to submenu object in menuIdMap
function assignMenuIds(menus, menuIdMap, parentMenu) {
	angular.forEach(menus, function(menu) {
		if (!angular.isUndefined(parentMenu)) {
			menu.parentId = parentMenu.id;
		}
		if (angular.isArray(menu.subMenus)) {
			if (angular.isUndefined(menu.id)) {
				menu.id = getUniqueId();
			}
			menuIdMap[menu.id] = menu;
			assignMenuIds(menu.subMenus, menuIdMap, menu);
		}
	});
}

// Returns a flat object of every submenu nested within menu
function getAllSubmenus(menu, subMenus) {
	if (angular.isArray(menu.subMenus)) {
		subMenus[menu.id] = menu.subMenus;
	}
	angular.forEach(menu.subMenus, function(subMenu) {
		getAllSubmenus(subMenu, subMenus);
	});
}

angular.module('bossy.navigation', ['bossy.data'])
	.directive('bossyNavigation', Navigation)
;
