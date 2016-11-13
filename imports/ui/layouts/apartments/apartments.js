import { Template } from 'meteor/templating';
import { Apartments } from '../../../api/apartments/apartment';

Template.apartments.onCreated(function onCreated() {
    Meteor.subscribe('apartments');
});

Template.apartments.helpers({
    apartments() {
        return Apartments.find({});
    },
});
