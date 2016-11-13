import { Apartments } from './apartment';

if (Meteor.isServer) {
    Meteor.publish('apartments', function publishApartments() {
        return Apartments.find({});
    });
}
