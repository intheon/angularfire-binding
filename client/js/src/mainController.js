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

	this.signIn = () => {
		$scope.auth.$signInWithPopup("google")
		.then((user) => {
			console.log(user)
			this.userDetails = user;
			this.isLoggedIn = true;
			this.createUser();
			this.retreiveTodos();
		})
		.catch((error) => {
			console.log(error)
		})
	}

	this.retreiveTodos = () => {
		let ref = firebase.database().ref("user-todos/" + this.userDetails.user.uid);
		this.allTodos = $firebaseObject(ref);

		console.log(this.allTodos);


	}

	this.signOut = () => {
		$scope.auth.$signOut();
		this.isLoggedIn = false;
		this.userDetails = null;
	}

	this.createUser = () => {
		let ref = firebase.database().ref("profiles/" + this.userDetails.user.uid).set({
			fullName: this.userDetails.user.displayName,
			email: this.userDetails.user.email,
			photo : this.userDetails.user.photoURL
		});
	}

	this.submitTodo = () => {
		if (this.todoTitle){
			let key = firebase.database().ref("todos").push().key;

			let todoMeta = {
				title: this.todoTitle,
				timeAdded: Date.now(),
				ownerId: this.userDetails.user.uid
			}

			let addToAll = firebase.database().ref("todos/" + key).set(todoMeta);
			let addUserTodos = firebase.database().ref("user-todos/" + todoMeta.ownerId + "/" + key).set(todoMeta);
		}
	}



}

export default mainController