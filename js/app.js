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


////////// ROUTING /////////////////////////

// Deffining $routeProvider for Pomidoro applicatiom module
//
saabMicroApp.config(function ($routeProvider) {
	$routeProvider
		
	
		//
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
saabMicroApp.controller('RootController', function($scope, landingPageFactory){
	
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

	
		$scope.slides = landingPageFactory.getLandingPageContent();
		//console.log($scope.slides[0].name);


	};
	
});




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



///////////// FACTORIES ////////////////////////////



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





