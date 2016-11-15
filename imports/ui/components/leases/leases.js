import { Template } from 'meteor/templating';
import { Leases } from '../../../api/leases/leases';

Template.leasesTable.onCreated(function onCreated() {
    Meteor.subscribe('leases');
});

Template.leasesTable.helpers({
    leases() {
        return Leases.find({});
    },
});
