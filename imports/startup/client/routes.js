import { Router } from 'meteor/iron:router';

// import necessary templates
import '../../ui/layouts/main_layout/main.html';
import '../../ui/pages/home/home.html';
import '../../ui/pages/admin/admin.html';


Router.configure({
   layoutTemplate: "main"
});


Router.route('/', function() {
    this.render("home");
});

Router.route("/admin", function() {
    this.render('admin');
});