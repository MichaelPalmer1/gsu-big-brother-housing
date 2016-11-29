import { Template } from 'meteor/templating';
import { Residents } from '../../../api/residents/residents';
import { TimeStamp } from '../../../api/timestamp/timestamp';
import Chart from 'chart.js/dist/Chart.min';
import './residentStats.html';
import './residentStats.css';

Meteor.subscribe('TimeStamp');

let charts = {
    presence: null,
    demographic: null,
    gender: null,
    popularTimes: null
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
        var percent = (Residents.find({'present': true}).count() / Residents.find().count()) * 100;
        return percent.toFixed(2);
    },
    timestamp_count: function () {
        return TimeStamp.find().count();
    },

    presenceChart: function () {
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

        Meteor.defer(function () {
            charts.presence = new Chart('presenceChart', chartOptions);
            updateChart();
        });
    },
    demographicChart: function () {
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

        Residents.find({race: {$in: ['White', 'Asian', 'Black']}}).observeChanges({
            added: updateChart,
            changed: updateChart,
            removed: updateChart
        });

        Meteor.defer(function () {
            charts.demographic = new Chart('demographicChart', chartOptions);
            updateChart();
        });
    },
    genderChart: function () {
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

        Residents.find({sex: {$in: ['male', 'female']}}).observeChanges({
            added: updateChart,
            changed: updateChart,
            removed: updateChart
        });

        Meteor.defer(function () {
            charts.gender = new Chart('genderChart', chartOptions);
            updateChart();
        });
    },
    popularTimesChart: function () {

        var hour_labels = [];
        for (var i = 0; i < 24; i++) {
            hour_labels.push(i);
        }

        //var timestamp;
        var hour_frequencies_raw = {};
        var hour_frequencies = []; // list of dicts of the form: {data: [freq_count], label: hour}
        var timestamps = TimeStamp.find({});

        timestamps.forEach(function (timestamp) {
            var hour = new Date(timestamp.time);
            hour = hour.getHours();
            hour_frequencies_raw[hour] = hour_frequencies_raw[hour] ? hour_frequencies_raw[hour] + 1 : 1;
        });

        console.log(hour_frequencies_raw);


        //for (var [key, value] of Object.entries(hour_frequencies_raw)) {
        //    var data = [];
        //    for (var i = 0; i < 24; i++)
        //        data.push(null);
        //
        //    data[key] = value;
        //
        //    hour_frequencies.push({
        //        data: data,
        //        label: parseInt(key),
        //        backgroundColor: '#26B99A',
        //        barPercentage: 1
        //    });
        //}
        var chart_data = [];
        for (var i = 0; i < 24; i++)
            chart_data.push(0);

        for (var [key, value] of Object.entries(hour_frequencies_raw)) {
            chart_data[key] = value;
        }

        console.log(chart_data);

        let chartOptions = {
            type: 'line',
            data: {
                labels: hour_labels,
                datasets: [
                    {
                        label: 'hours',
                        data: chart_data,
                        backgroundColor: '#26B99A'
                    }
                ]
            },
            options: {
                legend: {
                    display: false
                }
            }
        };

        function updateChart() {
            if (!charts.popularTimes)
                return;

            // update this
            let data = charts.popularTimes.data.datasets[0].data;
            let labels = charts.popularTimes.data.labels;
            //for (let i = 0; i < data.length; i++) {
                //data[i] = TimeStamp.find(}, {reactive: false}).count();
            //}
            //console.log(charts.popularTimes.data);
            charts.popularTimes.update();
        }

        TimeStamp.find({'arriving': true}).observeChanges({
            added: updateChart,
            changed: updateChart,
            removed: updateChart
        });

        Meteor.defer(function () {
            charts.popularTimes = new Chart('popularTimes', chartOptions);
            updateChart();
        });
    }

});
