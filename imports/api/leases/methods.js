import { Leases } from './leases';

if (Meteor.isServer) {
    Meteor.publish('leases', function publishLeases() {
        return Leases.find({});
    });
}
