import { Router } from 'meteor/iron:router';

// global css
import 'bootstrap/dist/css/bootstrap.min.css';

// global libraries
import 'jquery/dist/jquery.min';
import 'bootstrap/dist/js/bootstrap.min';

// import layouts
import '../../ui/layouts/main_layout/main.html';

// import javascript files for each page
import '../../ui/pages/home/home';
import '../../ui/pages/leases/leases';
import '../../ui/pages/error/error';
import '../../ui/pages/residents/add/add_residents';
import '../../ui/pages/residents/listing/residents';

import '../../ui/pages/employees/add/add_employee';
import '../../ui/pages/employees/listing/employees';

import '../../ui/pages/loading/loading'

Router.configure({
    layoutTemplate: "main",
    notFoundTemplate: "error"
});


Router.route('/',
    function () {
        this.render("home");
    },
    {
        title: 'Home',
        loadingTemplate: 'loading',
        waitOn: function () {
            return Meteor.subscribe('residents');
        }
    }
);

Router.route('/leases',
    function () {
        this.render("leases");
    },
    {
        title: 'Leases',
    }
);

Router.route('/residents',
    function () {
        this.render("residents")
    },
    {
        title: "Residents"
    }
);

Router.route('/residents/add',
    function () {
        this.render("add_resident")
    },
    {
        title: "Add Resident"
    }
);

Router.route('/employees',
    function () {
        this.render("employees")
    },
    {
        title: "Employees"
    }
);

Router.route('/employees/add',
    function () {
        this.render("add_employee")
    },
    {
        title: "Add Employment"
    }
);

Router.route('/times',
    function () {
        this.render("times")
    },
    {
        title: "View Timestamps"
    }
);


Router.onAfterAction(function () {
    document.title = 'Big Brother Housing - ' + this.route.options.title;
});
