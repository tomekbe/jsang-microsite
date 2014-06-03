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
var pomidoroApp = angular.module('pomidoroApp',[]);


////////// ROUTING /////////////////////////

// Deffining $routeProvider for Pomidoro applicatiom module
//
pomidoroApp.config(function ($routeProvider) {
	$routeProvider
		
		// We are going to define routes,
		// controllers and templates associated
		// with these routes.
		// You can change these but make sure
		// you know what you are doing
		//

		// main route
		//
		.when('/',
		{
			controller: 'RootController',
			templateUrl: 'views/RootControllerView.html'
		})
		
		// theaters list page
		//
		.when('/theaters',
		{
			controller: 'TheatersController',
			templateUrl: 'views/TheatersControllerView.html'

		})
		.when('/page/:id', {
			controller: 'PageController',
			templateUrl:function(params){ return 'views/page' + params.id +'.html'}
			/*templateUrl: 'views/page.html'*/
		})
		
		// settings page
		//
		.when('/settings',
		{
			controller: 'SettingsController',
			templateUrl: 'views/SettingsControllerView.html'

		})

		// if non of the above routes
		// are matched we are setting router
		// to redirect to the RootController
		.otherwise({ redirectTo: '/'});

});

pomidoroApp.config(function ($httpProvider){
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});


///////// CONTROLERS ////////////////////////////
// Below we are going to define all the controllers
// we have defined in the router
//

// RootController
//
pomidoroApp.controller('RootController', function($scope,recommendedMoviesFactory, landingPageFactory){
	
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

		// As we need to wait for $http.get 
		// request data to be ready we are 
		// using .then on the promisse received
		// from factory
		recommendedMoviesFactory.getRecommended().then(function(data) {
		   //this will execute when the 
		   //AJAX call completes.
		   $scope.recommendedMovies = data.movies;
		   $scope.ready = true;		   
		   //console.log(data.movies);
		});

		$scope.slides = landingPageFactory.getLandingPageContent();
		//console.log($scope.slides[0].name);


	};
	
});

// TheatersController
//
pomidoroApp.controller('TheatersController', function($scope,theatersFactory){
	
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


pomidoroApp.controller('PageController', function($scope,$routeParams,$location,pagesFactory){
	
	// This controller is going to set theaters
	// variable for the $scope object in order for view to
	// display its contents on the screen as html 

	$scope.page = [];
	$scope.pageId = $routeParams.id;
	console.log($routeParams.id,"this is route Params id ");
	init();
	
	function init() {
		$pages = pagesFactory.getPagesContent();
		$scope.page = $pages[$routeParams.id-1];
		console.log($routeParams.id, "this is route params id passed");
	}


});

// SettingsController
//
pomidoroApp.controller('SettingsController', function($scope){
	// This controller is going just to serve the view
});


///////////// FACTORIES ////////////////////////////

// Defining recommendedMovies factory
// It has 5 recomended movies and 
// makes them awailable to controller
// so it can pass values to the temmplate
//
pomidoroApp.factory('recommendedMoviesFactory', function($http){
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

// Defining theatersFactory factory
// In this example it has 5 movie theatres 
// but in real live application you would 
// want it to get this data from the web
// service, based on the the movie selected
// by user
//
pomidoroApp.factory('theatersFactory', function(){
	var theaters = [
		{ name: 'Everyman Walton', address: '85-89 High Street London'},
		{ name: 'Ambassador Cinemas', address: 'Peacocks Centre Woking'},
		{ name: 'ODEON Kingston', address: 'larence Street Kingston Upon Thames'},
		{ name: 'Curzon Richmond', address: '3 Water Lane Richmond'},
		{ name: 'ODEON Studio Richmond', address: '6 Red Lion Street Richmond'}
	];

	var factory = {};
	factory.getTheaters = function(){

		// If performing http communication to receive
		// factory data, the best would be to put http
		// communication code here and return the results
		return theaters;
	}

	return factory;
});



pomidoroApp.factory('landingPageFactory', function(){
	var landingPageSlides = [
		{ id:1, name: 'YOUR ROLE IN BUILDING', name2:'THE SAAB BRAND.', number:'1', pic: 'img/cap1.png'},
		{ id:2, name: 'OUR BRAND', name2:'PLATFORM.',number:'2', pic: 'img/cap2.png'},
		{ id:3, name: 'HOW WE.', name2:'COMMUNICATE.', number:'3',pic: 'img/cap3.png'},
	
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


pomidoroApp.factory('pagesFactory', function(){
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





