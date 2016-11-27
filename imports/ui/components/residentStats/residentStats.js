import { Template } from 'meteor/templating';
import { Residents } from '../../../api/residents/residents';
import './residentStats.html';
import './residentStats.css';


Template.residentStats.helpers({
    resident_count: function() {
        return Residents.find().count();
    }
});
