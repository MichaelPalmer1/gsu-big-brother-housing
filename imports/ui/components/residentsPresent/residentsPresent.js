import { Template } from 'meteor/templating';
import { Residents } from '../../../api/residents/residents';
import { TimeStamp } from '../../../api/timestamp/timestamp';
import './residentsPresent.html';

Template.residentsPresent.onCreated(function onCreated() {
    Meteor.subscribe('residents');
});


Template.residentsPresent.helpers({
    residents() {
        return Residents.find({}).map(function (resident, index) {
            resident.id = index + 1;
            return resident;
        });
    }
});

// ------------

Template.residentPresentRow.onRendered(function () {
    var elem = this.find('.js-switch');
    var init = new Switchery(elem);
});


Template.residentPresentRow.events({
    'click .js-switch': function (event) {

        Residents.update(this._id, {
            $set: {present: !this.present}
        });

        var is_present = this.present;
        console.log(is_present);

        TimeStamp.insert({
            'arriving': !this.present,
            'time': new Date()
        });

    }
});

Template.residentPresentRow.helpers({
    'isChecked': function () {
        if (this.present) {
            return 'checked';
        }
    }
});
