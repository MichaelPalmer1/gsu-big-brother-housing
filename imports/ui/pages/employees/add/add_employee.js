import './add_employee.html';
import { Residents } from '../../../../api/residents/residents';
import { Leases } from '../../../../api/leases/leases';
import { Employee } from '../../../../api/employees/employees';


Template.add_employee.rendered = function () {

    $.getScript('/vendors/jQuery-Smart-Wizard/js/jquery.smartWizard.js', function () {
        $('#wizard').smartWizard();


        $('.buttonNext').addClass('btn btn-success');
        $('.buttonPrevious').addClass('btn btn-primary');
        $('.buttonFinish').addClass('btn btn-default');

        // Not in Template.add_resident.events as that won't add events to the programatically added btns
        $(".buttonFinish").click(function (event) {
            event.preventDefault();

            var first_name = $("#first-name").val();
            var last_name = $("#last-name").val();
            var gender = $("#gender .active").text().replace(/\s/g, '').toLowerCase();
            var birthday = new Date($("#birthday").val());
            var demo = $("#demographic").val();
            var position = $("#position").val();
            var previousOccupation = $("#previousOccupation").val();

            Employee.insert({
                'firstName': first_name,
                'lastName': last_name,
                'sex': gender,
                'dateOfBirth': birthday,
                'race': demo,
                'position': position,
                'previousOccupation': previousOccupation
            });

            Router.go('/employees');

        });

    });
};
