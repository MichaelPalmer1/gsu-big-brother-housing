import { Template } from 'meteor/templating';
import { Residents } from '../../../api/residents/residents';
import './residents.html';

Template.residentsTable.onCreated(function onCreated() {
    Meteor.subscribe('residents');
});

Template.residentsTable.helpers({
    residents() {
        return Residents.find({}).map(function(resident, index) {
          resident.id = index + 1;
          return resident;
        });
    },
});

Template.residentsTable.events({
    'click .delete'() {
        Meteor.call('residents.remove', this._id);
    },
});
