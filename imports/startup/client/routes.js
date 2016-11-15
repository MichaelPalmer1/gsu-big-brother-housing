import { Router } from 'meteor/iron:router';

// import necessary templates
import '../../ui/layouts/main_layout/main.html';
import '../../ui/pages/home/home.html';
import '../../ui/pages/admin/admin.html';
import '../../ui/pages/error/error.html';
//import '../../ui/pages/residents/listing/residents.html';
//import '../../ui/pages/residents/add/add_resident.html';

// javascript files
import '../../ui/pages/home/home';
import '../../ui/pages/admin/admin';
import '../../ui/pages/error/error';
//import '../../ui/pages/residents/add/add_residents';
//import '../../ui/pages/residents/listing/residents';


Router.configure({
   layoutTemplate: "main",
   notFoundTemplate: "error"
});


Router.route('/',
    function() {
        this.render("home");
    },
    {
        title: 'Home'
    }
);

Router.route('/admin',
    function() {
        this.render("admin");
    },
    {
        title: 'Admin'
    }
);

Router.route('/residents',
    function() {
        this.render("residents")
    },
    {
        title: "Residents"
    }
);

Router.route('/residents/add',
    function() {
        this.render("add_resident")
    },
    {
        title: "Residents"
    }
);


Router.onAfterAction(function() {
    document.title = 'Big Brother Housing - ' + this.route.options.title;
});
