import './add_resident.html';

Template.add_resident.rendered = function() {

    $.getScript('/vendors/jQuery-Smart-Wizard/js/jquery.smartWizard.js', function(){
        $('#wizard').smartWizard();


        $('.buttonNext').addClass('btn btn-success');
        $('.buttonPrevious').addClass('btn btn-primary');
        $('.buttonFinish').addClass('btn btn-default');

    });



};

//Template.add_resident.events({
//   "click .buttonFinish": function(event) {
//        event.preventDefault();
//       console.log(event);
//   }
//});

