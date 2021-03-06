import './add_resident.html';
import { Residents } from '../../../../api/residents/residents';
import { Leases } from '../../../../api/leases/leases';


Template.add_resident.rendered = function () {

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
            var occupation = $("#occupation").val();
            var salary = parseInt($("#salary").val());

            var apt_num = parseInt($("#apt-num").val());
            var rent = $("#rent").val();
            var start_date = new Date($("#start-date").val());
            var end_date = new Date($("#end-date").val());

            rent.replace('$', '');
            rent = parseInt(rent);

            var resident_id = Residents.insert({
                'firstName': first_name,
                'lastName': last_name,
                'sex': gender,
                'dateOfBirth': birthday,
                'race': demo,
                'salary': salary,
                'occupation': occupation,
                'apartment': apt_num,
                'present': true
            });

            var resident = Residents.findOne({'_id': resident_id});

            Leases.insert({
                'signer': resident,
                'rent': rent,
                'startDate': start_date,
                'endDate': end_date,
                'apartment': apt_num

            });

            Router.go('/residents');

        });

    });
};
