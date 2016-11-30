import { Leases } from './leases';
import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check';

if (Meteor.isServer) {
    Meteor.publish('leases', function publishLeases() {
        return Leases.find({});
    });
}

Meteor.methods
({
    'leases.remove'(leaseId) {
        check(leaseId, String);
        Leases.remove(leaseId);
    },
});
