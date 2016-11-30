import { Residents } from "./residents";
import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check';

if (Meteor.isServer) {
    Meteor.publish('residents', function publishResidents() {
        return Residents.find({});
    });
}

Meteor.methods
({
    'residents.insert'(firstName, lastName)
    {
        check(firstName, String);
        check(lastName, String);

        Residents.insert({
            firstName: firstName,
            lastName: lastName
        });
    },
    'residents.remove'(residentId) {
        check(residentId, String);
        Residents.remove(residentId);
    },

});
