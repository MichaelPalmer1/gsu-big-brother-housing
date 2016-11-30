import { Template } from 'meteor/templating';
import { TimeStamp } from '../../../api/timestamp/timestamp';
import './timestamps.html';

Template.timestampTable.onCreated(function onCreated() {
    Meteor.subscribe('TimeStamp');
});

Template.timestampTable.helpers({
    timestamps() {
        return TimeStamp.find({}, {sort: {time: -1}}).map(function(timestamp, index) {
          timestamp.id = index + 1;
          return timestamp;
        });
    },
});
