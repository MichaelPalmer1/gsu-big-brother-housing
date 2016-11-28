import { Template } from 'meteor/templating';
import { Tracker } from 'meteor/tracker';
import { Residents } from '../../../api/residents/residents';
import Chart from 'chart.js/dist/Chart';
import './residentStats.html';
import './residentStats.css';

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
                    data: [
                        Residents.find({'present': true}).count(),
                        Residents.find({'present': false}).count(),
                    ],
                    backgroundColor: ['#26B99A', '#455C73'],
                    label: 'Resident Presence'
                }],
                labels: ['Present', 'Absent']
            }
        };

        Meteor.defer(function() {
            window.chart = window.chart || {};
            window.chart.presenceChart = new Chart('presenceChart', chartOptions);
        });
    },
    demographicChart: function() {
        let chartOptions = {
            type: 'pie',
            data: {
                datasets: [{
                    data: [
                        Residents.find({race: 'White'}).count(),
                        Residents.find({race: 'Asian'}).count(),
                        Residents.find({race: 'Black'}).count()
                    ],
                    backgroundColor: ['#26B99A', '#455C73', '#36A2EB'],
                    label: 'Resident Demographics'
                }],
                labels: ['White', 'Asian', 'Black']
            }
        };

        Meteor.defer(function() {
            window.chart = window.chart || {};
            window.chart.demographicChart = new Chart('demographicChart', chartOptions);
        });
    },
    genderChart: function() {
        let chartOptions = {
            type: 'pie',
            data: {
                datasets: [{
                    data: [
                        Residents.find({sex: 'male'}).count(),
                        Residents.find({sex: 'female'}).count()
                    ],
                    backgroundColor: ['#26B99A', '#455C73'],
                    label: 'Resident Genders'
                }],
                labels: ['Male', 'Female']
            }
        };

        Meteor.defer(function() {
            window.chart = window.chart || {};
            window.chart.genderChart = new Chart('genderChart', chartOptions);
        });
    }
});

Template.residentStats.rendered = function() {
    Tracker.autorun(function() {
        if (window.chart.presenceChart) {
            window.chart.presenceChart.update();
        }
        if (window.chart.demographicChart) {
            window.chart.demographicChart.update();
        }
        if (window.chart.genderChart) {
            window.chart.genderChart.update();
        }
    });
};
