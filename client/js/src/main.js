import angular from "angular";
import firebase from "firebase";
import angularFire from "angularfire";
import mainController from "./mainController.js"

angular.module("angularfireApp", ["firebase"])
	.controller("mainController", mainController);

