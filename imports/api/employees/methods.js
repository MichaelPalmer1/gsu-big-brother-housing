import { Employee } from "./employees";
import { Meteor } from 'meteor/meteor'

if (Meteor.isServer) {
  Meteor.publish('Employee', function employeePublication() {
    return Employee.find();
  });
}
