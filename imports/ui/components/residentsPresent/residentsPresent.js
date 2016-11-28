import { Template } from 'meteor/templating';
import { Residents } from '../../../api/residents/residents';
import './residentsPresent.html';

Template.residentsPresent.onCreated(function onCreated() {
    Meteor.subscribe('residents');

});


Template.residentsPresent.helpers({
    residents() {
        return Residents.find({}).map(function(resident, index) {
          resident.id = index + 1;
          return resident;
        });
    }
});

// ------------

Template.residentPresentRow.rendered = function () {
    if (!this.rendered){

        var btn = $(".js-switch").eq(0);
        var switchery = new Switchery(btn, {
            color: '#26B99A'
        });
    }
};

Template.residentPresentRow.events({
    'click .js-switch': function(event) {
        console.log(this._id);
        console.log(this.present);

        Residents.update(this._id, {
            $set: {present: ! this.present}
        })
    }
});

Template.residentPresentRow.helpers({
    'isChecked': function() {
        if (this.present) {
            return 'checked';
        }
    }
});
