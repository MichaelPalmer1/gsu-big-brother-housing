import { Employee } from "./employees";
import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check';

if (Meteor.isServer) {
  Meteor.publish('Employee', function employeePublication() {
    return Employee.find();
  });
}

Meteor.methods
({
    'employees.remove'(employeeId) {
        check(employeeId, String);
        Employee.remove(employeeId);
    },
});
