
import { Template } from 'meteor/templating';

import { Residents } from '../../../api/residents/residents';


Template.home.onCreated(function homeOnCreated() {
    Meteor.subscribe('residents');
});

Template.home.helpers({
    residents() {
        return Residents.find({}).map(function(resident, index) {
          resident.id = index + 1;
          return resident;
        });
    },
});
