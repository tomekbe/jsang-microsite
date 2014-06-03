// Pomidoro Mobile Application
// app.js
//
// This is the main application .js file
// with modules, controllers and router
//
// created by @sauliuz
// PopularOwl Labs // www.popularowl.com
// Visit www.htmlcenter.com 
// for more mobile application templates
////////////////////////////////////////////

// Defining angular application model
// for Pomidoro app
//
var saabMicroApp = angular.module('saabMicroApp',[]);

var all = document.getElementById('all');
	//console.log(all);


//ng-view ng-animate="'slide'"
 setTimeout(function() {
    all.setAttribute('ng-view','');
    all.setAttribute('ng-animate',"'slide'")
    angular.bootstrap(all, ['ng', 'saabMicroApp']);
   document.getElementById('splash-screen').style.display='none';
  }, 2000);

////////// ROUTING /////////////////////////

// Deffining $routeProvider for Pomidoro applicatiom module
//
saabMicroApp.config(function ($routeProvider) {
	$routeProvider
		
	
		.when('/',
		{
			controller: 'RootController',
			templateUrl: 'views/RootControllerView.html'
		})
		
		
		.when('/page/:id', {
			controller: 'PageController',
			templateUrl:function(params){ return 'views/page' + params.id +'.html'}
			/*templateUrl: 'views/page.html'*/
		})
		

		.otherwise({ redirectTo: '/'});

});

saabMicroApp.config(function ($httpProvider){
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});


///////// CONTROLERS ////////////////////////////
// Below we are going to define all the controllers
// we have defined in the router
//

// RootController
//
saabMicroApp.controller('RootController', function($scope,recommendedMoviesFactory, landingPageFactory){
	
	// Controller is going to set recommendedMovies
	// variable for the $scope object in order for view to
	// display its contents on the screen as html 
	$scope.recommendedMovies = [];
	$scope.slides = [];

	// Just a housekeeping.
	// In the init method we are declaring all the
	// neccesarry settings and assignments
	init();

		
	function init(){

	
		/*recommendedMoviesFactory.getRecommended().then(function(data) {
		 
		   $scope.recommendedMovies = data.movies;
		   $scope.ready = true;		   
		
		});*/

		$scope.slides = landingPageFactory.getLandingPageContent();
		//console.log($scope.slides[0].name);


	};
	
});

// TheatersController
//
saabMicroApp.controller('TheatersController', function($scope,theatersFactory){
	
	// This controller is going to set theaters
	// variable for the $scope object in order for view to
	// display its contents on the screen as html 
	$scope.theaters = [];

	// Just a housekeeping.
	// In the init method we are declaring all the
	// neccesarry settings and assignments
	init();

	function init(){
		$scope.theaters = theatersFactory.getTheaters();
	}	
});

// Page Controller
//


saabMicroApp.controller('PageController', function($scope,$routeParams,$location,pagesFactory){
	
	// This controller is going to set theaters
	// variable for the $scope object in order for view to
	// display its contents on the screen as html 

	$scope.page = [];
	$scope.strony =[];
	$scope.pageId = $routeParams.id;
	$scope.dupa ="wartosc ";

	//console.log($routeParams.id,"this is route Params id ");
	init();
	
	function init() {
		$scope.strony = pagesFactory.getPagesContent();
		$scope.pages = pagesFactory.getPagesContent();
		console.log($scope.pages,"these are pages");
		$scope.page = $scope.pages[$routeParams.id-1];

		//console.log($routeParams.id, "this is route params id passed");
	}


});

// SettingsController
//
saabMicroApp.controller('SettingsController', function($scope){
	// This controller is going just to serve the view
});


///////////// FACTORIES ////////////////////////////

// Defining recommendedMovies factory
// It has 5 recomended movies and 
// makes them awailable to controller
// so it can pass values to the temmplate
//
saabMicroApp.factory('recommendedMoviesFactory', function($http){
	var recommended = [
		{ name: 'World War Z', description: 'The story revolves around United Nations employee Gerry Lane (Pitt), who traverses the world in a race against time to stop a pandemic', img: 'img/wardwarz.png'},
		{ name: 'Star Trek Into Darkness', description: 'When the crew of the Enterprise is called back home, they find an unstoppable force of terror from within their own organization has detonated the fleet and everything it stands for', img: 'img/intodarkness.png'},
		{ name: 'The Iceman', description: 'Appearing to be living the American dream as a devoted husband and father in reality Kuklinski was a ruthless killer-for-hire.', img: 'img/wardwarz.png'},
		{ name: 'Iron Man 3', description: 'When Stark finds his personal world destroyed at his enemys hands, he embarks on a harrowing quest to find those responsible.', img: 'img/wardwarz.png'},
		{ name: 'Django Unchained', description: 'Set in the South two years before the Civil War, Django Unchained stars Jamie Foxx as Django', img: 'img/wardwarz.png'}
		
	];

	var factory = {};
	factory.getRecommended = function(){

	
		// This is the place for performing http communication
		// with 3rd party web services.
		var url = 'http://pizg.net/tests/pomodoro.php'

		return $http.get(url).then( function(response){
			return response.data;
		})

	}

	return factory;
});





saabMicroApp.factory('landingPageFactory', function(){
	var landingPageSlides = [
		{ id:1, caption: '1. Your role in building the Saab brand',name: 'YOUR ROLE IN BUILDING', name2:'THE SAAB BRAND.', number:'1', pic: 'img/cap1.png'},
		{ id:2, caption: '2. Our brand platform.', name: 'OUR BRAND', name2:'PLATFORM.',number:'2', pic: 'img/cap2.png'},
		{ id:3, caption: '3. How we communicate.', name: 'HOW WE.', name2:'COMMUNICATE.', number:'3',pic: 'img/cap3.png'},
	
	];

	var factory = {};
	factory.getLandingPageContent = function(){

		// If performing http communication to receive
		// factory data, the best would be to put http
		// communication code here and return the results
		return landingPageSlides;
	}

	return factory;
});


saabMicroApp.factory('pagesFactory', function(){
	var pagesContent = [
		{ id:1, caption: '1. Your role in building the Saab brand',name: 'YOUR ROLE IN BUILDING', name2:'THE SAAB BRAND.', number:'1', pic: 'img/cap1.png'},
		{ id:2, caption: '2. Our brand platform.',name: 'OUR BRAND', name2:'PLATFORM.',number:'2', pic: 'img/cap2.png', paragraphs:'nico'},
		{ id:3, caption: '3. How we communicate.',name: 'HOW WE.', name2:'COMMUNICATE.', number:'3',pic: 'img/cap3.png', paragraphs:'nico nico'},
	
	];

	var factory = {};
	factory.getPagesContent = function(){

		// If performing http communication to receive
		// factory data, the best would be to put http
		// communication code here and return the results
		return pagesContent;
	}

	return factory;
});





