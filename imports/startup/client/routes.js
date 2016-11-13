import { Router } from 'meteor/iron:router';

// import necessary templates
import '../../ui/layouts/main_layout/main.html';
import '../../ui/pages/home/home.html';
import '../../ui/pages/admin/admin.html';
import '../../ui/pages/error/error.html';

// javascript files
import '../../ui/pages/home/home';
import '../../ui/pages/admin/admin';
import '../../ui/pages/error/error';


Router.configure({
   layoutTemplate: "main",
   notFoundTemplate: "error"
});


Router.route('/', function() {
    this.render("home");
});

Router.route("/admin", function() {
    this.render('admin');
});
