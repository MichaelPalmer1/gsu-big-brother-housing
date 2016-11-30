import { TimeStamp } from "./timestamp";
import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check';

if (Meteor.isServer) {
  Meteor.publish('TimeStamp', function timeStampPublication() {
    return TimeStamp.find();
  });
}

Meteor.methods
({
    'timestamp.remove'(timestampId) {
        check(timestampId, String);
        TimeStamp.remove(timestampId);
    },
});
