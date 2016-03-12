function NavigationCtrl ($scope) {
	$scope.menu1Config = {};
	$scope.menu1Config.menuObj = {

		'activeMenuId': 'python',
		'navigation': [
			{
				'title': 'Home',
				'url': 'http://www.bossyui.io/'
			},
			{
				'title': 'Resumes',
				'menuId': 'resumes',
				'subMenus': [
					{
						'title': 'Technical',
						'url': 'https://www.linkedin.com/in/eddie-bracho-00b8ab84'
					},
					{
						'title': 'General',
						'url': 'https://www.linkedin.com/in/eddie-bracho-00b8ab84'
					}
				]
			},
			{
				'title': 'Projects',
				'menuId': 'projects',
				'subMenus': [
					{
						'title': 'Python',
						'menuId': 'python',
						'subMenus': [
							{
								'title': 'Artificial Neural Network',
								'url': 'https://github.com/ebracho/ANN'
							},
							{
								'title': 'Boolean Expression Interpreter',
								'url': 'https://github.com/ebracho/Boolean_Expression_Interpreter'
							},
							{
								'title': 'Tetris Clone',
								'url': 'https://github.com/ebracho/Tetris'
							},
							{
								'title': 'Irc Bot',
								'url': 'https://github.com/ebracho/kazbot'
							}
						]
					},
					{
						'title': 'Javascript',
						'menuId': 'javascript',
						'subMenus': [
							{
								'title': 'Navigation',
								'url': 'https://github.com/ebracho/BossyUI/tree/NAVIGATION-170'
							},
							{
								'title': 'Autocomplete',
								'url': 'https://github.com/ebracho/BossyUI/tree/AUTOCOMPLETE-163'
							}
						]
					},
					{
						'title': 'C++',
						'menuId': 'c++',
						'subMenus': [
							{
								'title': 'Matrix Library',
								'url': 'ebracho.com/projects/c++/matrix_library'
							}
						]
					}
				]
			},
			{
				'title': 'Github',
				'url': 'http://github.com/ebracho'
			}
		]
	};

	$scope.menu2Config = {
		menuUrl: 'templates/js/tigerdirect.json'
	};
}

angular.module('navigation', [])
	.controller('NavigationCtrl', NavigationCtrl)
;
