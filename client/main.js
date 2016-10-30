import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

// Stylesheets
import 'gentelella/vendors/bootstrap/dist/css/bootstrap.min.css';
import 'gentelella/vendors/font-awesome/css/font-awesome.min.css';
import 'gentelella/vendors/iCheck/skins/flat/green.css';
import 'gentelella/vendors/bootstrap-progressbar/css/bootstrap-progressbar-3.3.4.min.css';
import 'gentelella/production/css/maps/jquery-jvectormap-2.0.3.css';
import 'gentelella/build/css/custom.min.css';

// JavaScript
import 'gentelella/vendors/jquery/dist/jquery.min'
import 'gentelella/vendors/jquery/dist/jquery.min.js';
import 'gentelella/vendors/bootstrap/dist/js/bootstrap.min.js';
import 'gentelella/vendors/fastclick/lib/fastclick.js';
import 'gentelella/vendors/nprogress/nprogress.js';
import 'gentelella/vendors/Chart.js/dist/Chart.min.js';
import 'gentelella/vendors/bernii/gauge.js/dist/gauge.min.js';
import 'gentelella/vendors/bootstrap-progressbar/bootstrap-progressbar.min.js';
import 'gentelella/vendors/iCheck/icheck.min.js';
import 'gentelella/vendors/skycons/skycons.js';
import 'gentelella/vendors/Flot/jquery.flot.js';
import 'gentelella/vendors/Flot/jquery.flot.pie.js';
import 'gentelella/vendors/Flot/jquery.flot.time.js';
import 'gentelella/vendors/Flot/jquery.flot.stack.js';
import 'gentelella/vendors/Flot/jquery.flot.resize.js';
import 'gentelella/vendors/Flot/jquery.flot.orderBars.js';
import 'gentelella/flot/date.js';
import 'gentelella/flot/jquery.flot.spline.js';
import 'gentelella/flot/curvedLines.js';
import 'gentelella/maps/jquery-jvectormap-2.0.3.min.js';
import 'gentelella/moment/moment.min.js';
import 'gentelella/datepicker/daterangepicker.js';
import 'gentelella/build/js/custom.min.js';


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
