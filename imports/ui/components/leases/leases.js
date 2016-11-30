import { Template } from 'meteor/templating';
import { Leases } from '../../../api/leases/leases';
import './leases.html';

Template.leasesTable.onCreated(function onCreated() {
    Meteor.subscribe('leases');
});

Template.leasesTable.helpers({
    leases() {
        return Leases.find({});
    },
});

Template.leasesTable.events({
    'click .delete'() {
        Meteor.call('leases.remove', this._id);
    },
});
