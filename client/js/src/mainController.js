function mainController($scope, $firebaseObject, $firebaseAuth){
	$scope.isLoggedIn = false;

	this.fbConfig = {
		apiKey: "AIzaSyBNAnbMr3msYaa26BHm0OeVl0pMKs1eFyY",
		authDomain: "angularfirebinding.firebaseapp.com",
		databaseURL: "https://angularfirebinding.firebaseio.com",
		storageBucket: "",
	};

	// create a 'reference' to my own endpoint
	firebase.initializeApp(this.fbConfig);

	$scope.userDetails = null;
	$scope.auth = $firebaseAuth();

	this.signIn = () => {
		console.log("did i fire???");
		$scope.auth.$signInAnonymously().then((user) => {
			console.log("did this fire???");
			console.log($scope.isLoggedIn);
			console.log($scope.userDetails);
			this.isLoggedIn = true;
			this.userDetails = user;
			console.log($scope.isLoggedIn);
			console.log($scope.userDetails);
		});
	}

	this.signOut = () => {
		$scope.auth.$signOut();
		this.isLoggedIn = false;
		this.userDetails = null;
	}



}

export default mainController