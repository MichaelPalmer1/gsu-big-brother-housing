import { Template } from 'meteor/templating';
import { Residents } from '../../../api/residents/residents';
import './residentStats.html';
import './residentStats.css';

Template.residentStats.helpers({
    resident_count: function () {
        return Residents.find().count();
    },
    residents_present: function () {
        return Residents.find({'present': true}).count();
    },
    residents_absent: function () {
        return Residents.find({'present': false}).count();
    },
    percent_present: function () {
        return (Residents.find({'present': true}).count() / Residents.find().count()) * 100;
    }
});
