import { Template } from 'meteor/templating';
import { Residents } from '../../../api/residents/residents';
import Chart from 'chart.js/dist/Chart';
import './residentStats.html';
import './residentStats.css';

let charts = {
    presence: null,
    demographic: null,
    gender: null
};

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
    },
    presenceChart: function() {
        let chartOptions = {
            type: 'pie',
            data: {
                datasets: [{
                    data: [0, 0],
                    backgroundColor: ['#26B99A', '#455C73'],
                    label: 'Resident Presence'
                }],
                labels: ['Present', 'Absent']
            }
        };

        function updateChart() {
            if (!charts.presence)
                return;
            charts.presence.data.datasets[0].data[0] = Residents.find({present: true}, {reactive: false}).count();
            charts.presence.data.datasets[0].data[1] = Residents.find({present: false}, {reactive: false}).count();
            charts.presence.update();
        }

        Residents.find({present: true}).observeChanges({
            added: updateChart,
            changed: updateChart,
            removed: updateChart
        });

        Meteor.defer(function() {
            charts.presence = charts.presence || new Chart('presenceChart', chartOptions);
        });
    },
    demographicChart: function() {
        let chartOptions = {
            type: 'pie',
            data: {
                datasets: [{
                    data: [0, 0, 0],
                    backgroundColor: ['#26B99A', '#455C73', '#36A2EB'],
                    label: 'Resident Demographics'
                }],
                labels: ['White', 'Asian', 'Black']
            }
        };

        function updateChart() {
            if (!charts.demographic)
                return;
            let data = charts.demographic.data.datasets[0].data;
            let labels = charts.demographic.data.labels;
            for (let i = 0; i < data.length; i++) {
                data[i] = Residents.find({race: labels[i]}, {reactive: false}).count();
            }
            charts.demographic.update();
        }

        Residents.find({race: { $in: ['White', 'Asian', 'Black'] }}).observeChanges({
            added: updateChart,
            changed: updateChart,
            removed: updateChart
        });

        Meteor.defer(function() {
            charts.demographic = charts.demographic || new Chart('demographicChart', chartOptions);
        });
    },
    genderChart: function() {
        let chartOptions = {
            type: 'pie',
            data: {
                datasets: [{
                    data: [0, 0],
                    backgroundColor: ['#26B99A', '#455C73'],
                    label: 'Resident Genders'
                }],
                labels: ['Male', 'Female']
            }
        };

        function updateChart() {
            if (!charts.gender)
                return;
            let data = charts.gender.data.datasets[0].data;
            let labels = charts.gender.data.labels;
            for (let i = 0; i < data.length; i++) {
                data[i] = Residents.find({sex: labels[i].toLowerCase()}, {reactive: false}).count();
            }
            charts.gender.update();
        }

        Residents.find({sex: { $in: ['male', 'female'] }}).observeChanges({
            added: updateChart,
            changed: updateChart,
            removed: updateChart
        });

        Meteor.defer(function() {
            charts.gender = charts.gender || new Chart('genderChart', chartOptions);
        });
    }
});
