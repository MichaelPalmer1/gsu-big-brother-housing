import { Template } from 'meteor/templating';
import { Employee } from '../../../api/employees/employees';
import './employees.html';

Template.employeeTable.onCreated(function onCreated() {
    Meteor.subscribe('Employee');
});

Template.employeeTable.helpers({
    employees() {
        return Employee.find({}).map(function(employee, index) {
          employee.id = index + 1;
          return employee;
        });
    },
});
