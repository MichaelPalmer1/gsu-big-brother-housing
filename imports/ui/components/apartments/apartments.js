import { Template } from 'meteor/templating';
import { Apartments } from '../../../api/apartments/apartment';
import './apartments.html';

Template.apartmentsTable.onCreated(function onCreated() {
    Meteor.subscribe('apartments');
});

Template.apartmentsTable.helpers({
    apartments() {
        return Apartments.find({});
    },
});
