import { Template } from 'meteor/templating';
import { Residents } from '../../../api/residents/residents';

Template.residents.onCreated(function onCreated() {
    Meteor.subscribe('residents');
});

Template.residents.helpers({
    residents() {
        return Residents.find({}).map(function(resident, index) {
          resident.id = index + 1;
          return resident;
        });
    },
});
