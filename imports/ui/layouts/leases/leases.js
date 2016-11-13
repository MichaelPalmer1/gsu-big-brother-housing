import { Template } from 'meteor/templating';
import { Leases } from '../../../api/leases/leases';

Template.leases.onCreated(function onCreated() {
    Meteor.subscribe('leases');
});

Template.leases.helpers({
    leases() {
        return Leases.find({});
    },
});
