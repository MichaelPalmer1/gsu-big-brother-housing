import { Router } from 'meteor/iron:router';

// import necessary templates
import '../../ui/layouts/main_layout/main.html';
import '../../ui/pages/home/home.html';


Router.configure({
   layoutTemplate: "main"
});


Router.route('/', {
    template: "home"
});