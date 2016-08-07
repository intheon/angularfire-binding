function mainController($scope, $firebaseObject, $firebaseAuth){
	this.isLoggedIn = false;

	this.fbConfig = {
		apiKey: "AIzaSyBNAnbMr3msYaa26BHm0OeVl0pMKs1eFyY",
		authDomain: "angularfirebinding.firebaseapp.com",
		databaseURL: "https://angularfirebinding.firebaseio.com",
		storageBucket: "",
	};

	// create a 'reference' to my own endpoint
	firebase.initializeApp(this.fbConfig);

	this.userDetails = null;
	this.todoTitle = null;
	$scope.auth = $firebaseAuth();

	this.signIn = () => {
		$scope.auth.$signInWithPopup("google")
		.then((user) => {
			console.log(user)
			this.userDetails = user;
			this.isLoggedIn = true;
			this.createUser();
		})
		.catch((error) => {
			console.log(error)
		})
	}

	this.signOut = () => {
		$scope.auth.$signOut();
		this.isLoggedIn = false;
		this.userDetails = null;
	}

	this.createUser = () => {
		console.log("hello!");
		let ref = firebase.database().ref("profiles/" + this.userDetails.user.uid).set({
			fullName: this.userDetails.user.displayName,
			email: this.userDetails.user.email,
			photo : this.userDetails.user.photoURL
		})
		console.log(ref);

		/*
		let obj = $firebaseObject(ref);

		obj.$save().then((res) => {
			console.log("worked?");
			console.log(res);
		}).catch((e) => {
			console.log("no");
			console.log(e);
		})
		*/
	}

	this.submitTodo = () => {
		if (this.todoTitle){/*
			let ref = firebase.database().ref("todos").push();
			let profileRef = ref.child(this.userDetails.user.uid)
			$firebaseObject(profileRef).$save().then((response) => {
				console.log("saved?");
				console.log(response)
			}).catch((error) => {
				console.log("error?");
				console.log(error);
			})*/
		}
	}



}

export default mainController