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
	this.allTodos = null;
	$scope.auth = $firebaseAuth();


	this.doGuestLogin = () => {
		$scope.auth.$signInWithEmailAndPassword("guestaccount@intheon.uk", "guest123456").then((user) => {

			this.userDetails = user;
			this.isLoggedIn = true;
			this.retreiveTodos();

		});
	}

	this.doGuestLogin();

	this.signIn = () => {
		$scope.auth.$signInWithPopup("google")
		.then((user) => {
			console.log(user)
			this.userDetails = user.user;
			this.isLoggedIn = true;
			this.createUser();
			this.retreiveTodos();
		})
		.catch((error) => {
			console.log(error)
		})
	}

	this.retreiveTodos = () => {

		console.log("retreive...")
		let ref = firebase.database().ref("user-todos/" + this.userDetails.uid);
		this.allTodos = $firebaseObject(ref);

		console.log(this.allTodos);


	}

	this.signOut = () => {
		$scope.auth.$signOut();
		this.isLoggedIn = false;
		this.userDetails = null;
	}

	this.createUser = () => {
		let ref = firebase.database().ref("profiles/" + this.userDetails.uid).set({
			fullName: this.userDetails.displayName,
			email: this.userDetails.email,
			photo : this.userDetails.photoURL
		});
	}

	this.submitTodo = () => {
		if (this.todoTitle){
			let key = firebase.database().ref("todos").push().key;

			let todoMeta = {
				title: this.todoTitle,
				timeAdded: Date.now(),
				ownerId: this.userDetails.uid
			}

			let addToAll = firebase.database().ref("todos/" + key).set(todoMeta);
			let addUserTodos = firebase.database().ref("user-todos/" + todoMeta.ownerId + "/" + key).set(todoMeta);
		}
	}



}

export default mainController