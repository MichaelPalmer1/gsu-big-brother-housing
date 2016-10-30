import { Residents } from "../residents.js";
import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check';
Meteor.methods
({
    'residents.insert'(firstName,lastName)
    {
        check(firstName,String);
        check(lastName,String)
        Residents.insert({
            firstName,lastName
        });
    },

});