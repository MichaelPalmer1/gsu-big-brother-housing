import { Template } from 'meteor/templating';
import { Residents } from '../../../api/residents/residents';
import './residentsPresent.html';

Template.residentsPresent.onCreated(function onCreated() {
    Meteor.subscribe('residents');
});

Template.residentsPresent.helpers({
    residents() {
        return Residents.find({}).map(function(resident, index) {
          resident.id = index + 1;
          return resident;
        });
    },
});
