import { TimeStamp } from "./timestamp";
import { Meteor } from 'meteor/meteor'

if (Meteor.isServer) {
  Meteor.publish('TimeStamp', function timeStampPublication() {
    return TimeStamp.find();
  });
}
