import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

// Stylesheets
import 'gentelella/vendors/bootstrap/dist/css/bootstrap.min.css';
import 'gentelella/vendors/font-awesome/css/font-awesome.min.css';
import 'gentelella/vendors/iCheck/skins/flat/green.css';
import 'gentelella/vendors/bootstrap-progressbar/css/bootstrap-progressbar-3.3.4.min.css';
import 'gentelella/production/css/maps/jquery-jvectormap-2.0.3.css';
import 'gentelella/build/css/custom.min.css';

// JavaScript
import 'gentelella/vendors/jquery/dist/jquery.min'
import 'gentelella/vendors/bootstrap/dist/js/bootstrap.min';
import 'gentelella/vendors/fastclick/lib/fastclick';
import 'gentelella/vendors/nprogress/nprogress';
import 'gentelella/vendors/Chart.js/dist/Chart.min';
import 'gentelella/vendors/bernii/gauge.js/dist/gauge.min';
import 'gentelella/vendors/bootstrap-progressbar/bootstrap-progressbar.min';
import 'gentelella/vendors/iCheck/icheck.min';
import 'gentelella/vendors/skycons/skycons';
import 'gentelella/vendors/Flot/jquery.flot';
import 'gentelella/vendors/Flot/jquery.flot.pie';
import 'gentelella/vendors/Flot/jquery.flot.time';
import 'gentelella/vendors/Flot/jquery.flot.stack';
import 'gentelella/vendors/Flot/jquery.flot.resize';
import 'gentelella/production/js/flot/jquery.flot.orderBars';
import 'gentelella/production/js/flot/date';
import 'gentelella/production/js/flot/jquery.flot.spline';
import 'gentelella/production/js/flot/curvedLines';
import 'gentelella/production/js/maps/jquery-jvectormap-2.0.3.min';
import 'gentelella/production/js/moment/moment.min';
// import 'gentelella/production/js/datepicker/daterangepicker';
import 'gentelella/build/js/custom.min';

import 'gentelella/production/js/maps/jquery-jvectormap-world-mill-en';
import 'gentelella/production/js/maps/jquery-jvectormap-us-aea-en';
import 'gentelella/production/js/maps/gdp-data';

import './main.html';


Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
