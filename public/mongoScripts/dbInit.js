//for the field 'timeIn' it will be intialized by the first day of the lease

// var conn = new Mongo();
//
// var db = conn.getDB("BigBrother");

//create apartments
var apartment;
for(var i = 1; i< 13; i++)//make 12 apartments
{
    apartment = {"_id": i, "lease": null, "residents": []};
    db.Apartments.insert(apartment);
}
//
//Construct families that make up residents
 //Family 1, Single Mom with teenage kid, Apartment 1
    var mom =
    {
        "firstName" : "Erika",
        "lastName" : "Roman",
        "sex" :"female",
        "dateOfBirth" : new Date("1975-12-08"),
        "race" : "Black",
        "occupation" : "Software Developer",
        "salary": 88000.00,
        "apartment" : 1,
        "timeIn" : [],
        "timeOut" : [],
        "present": true

    };
    var son =
    {
        "firstName" : "David",
        "lastName" : "Roman",
        "sex" :"male",
        "dateOfBirth" : new Date("2000-06-21"),
        "race" : "Black",
        "apartment" : 1,
        "timeIn" : [],
        "timeOut" : [],
        "present": true
    };

    db.Residents.save(mom);
    db.Residents.save(son);

    var signer = db.Residents.findOne({"firstName" : "Erika", "lastName" : "Roman"},{});//should return object id
    var lease = {
        "rent" : 735.22,
        "apartment" : 1,
        "startDate" : new Date("2016-01-5T00:00:00"),
        "endDate" : new Date("2017-01-5T00:00:00"),
        "signer" : signer
}
    db.Leases.insert(lease);

//Family 2, Single Woman with no kids
    var woman =
    {
        "firstName" : "Rhonda",
        "lastName" : "James",
        "sex" :"female",
        "dateOfBirth" : new Date("1995-10-18"),
        "race" : "White",
        "occupation" : "Bartender",
        "salary": 48000.00,
        "apartment" : 2,
        "timeIn" : [],
        "timeOut" : [],
        "present": true

    };

    db.Residents.save(woman);

    signer = db.Residents.findOne({"firstName" : "Rhonda", "lastName" : "James"},{});//should return object id

    db.Leases.save(
        {
            "rent" : 735.22,
            "apartment" : 2,
            "startDate" : new Date("2016-05-15T00:00:00"),
            "endDate" : new Date("2017-05-15T00:00:00"),
            "signer" : signer
    });

//Family 3, Mom, Dad, daughter
    var mommy =
    {
        "firstName" : "Ana",
        "lastName" : "Reindhart",
        "sex" :"female",
        "dateOfBirth" : new Date("1990-09-27"),
        "race" : "White",
        "occupation" : "Paramedic",
        "salary": 43000.00,
        "apartment" : 3,
        "timeIn" : [],
        "timeOut" : [],
        "present": true

    };
     var dad =
    {
        "firstName" : "Leo",
        "lastName" : "Reindhart",
        "sex" :"male",
        "dateOfBirth" : new Date("1988-07-03"),
        "race" : "White",
        "occupation" : "Demolition Specialist",
        "salary": 47000.00,
        "apartment" : 3,
        "timeIn" : [],
        "timeOut" : [],
        "present": true

    };

     var babyGirl =
    {
        "firstName" : "Mercy",
        "lastName" : "Reindhart",
        "sex" :"female",
        "dateOfBirth" : new Date("2013-04-09"),
        "race" : "White",
        "apartment" : 3,
        "timeIn" : [],
        "timeOut" : [],
        "present": true

    };

    db.Residents.save(mommy);
    db.Residents.save(dad);
    db.Residents.save(babyGirl);

    signer = db.Residents.findOne({"firstName" : dad.firstName, "lastName" : dad.lastName},{});//should return object id

    db.Leases.save(
        {
            "rent" : 735.22,
            "apartment" : 3,
            "startDate" : new Date("2016-04-09T00:00:00"),
            "endDate" : new Date("2017-04-09T00:00:00"),
            "signer" : signer
    });

//Family 4, 2 brothers and a friend
        var older =
    {
        "firstName" : "Hanzo",
        "lastName" : "Shimada",
        "sex" :"male",
        "dateOfBirth" : new Date("1989-02-08"),
        "race" : "Asian",
        "occupation" : "Archery Expert",
        "salary": 29000.00,
        "apartment" : 4,
        "timeIn" : [],
        "timeOut" : [],
        "present": true

    };
        var younger =
    {
        "firstName" : "Genji",
        "lastName" : "Shimada",
        "sex" :"male",
        "dateOfBirth" : new Date("1991-03-08"),
        "race" : "Asian",
        "occupation" : "Ninjust Instructor",
        "salary": 32000.00,
        "apartment" : 4,
        "timeIn" : [],
        "timeOut" : [],
        "present": true

    };

        var friend =
    {
        "firstName" : "Tekha",
        "lastName" : "Zenyatta",
        "sex" :"male",
        "dateOfBirth" : new Date("1992-02-08"),
        "race" : "Asian",
        "occupation" : "Tai Chi Fighter",
        "salary": 40000.00,
        "apartment" : 4,
        "timeIn" : [],
        "timeOut" : [],
        "present": true

    };


    db.Residents.save(older);
    db.Residents.save(younger);
    db.Residents.save(friend);

    signer = db.Residents.findOne({"firstName" : older.firstName, "lastName" : older.lastName});//should return object id

    db.Leases.save(
        {
            "rent" : 735.22,
            "apartment" : 4,
            "startDate" : new Date("2016-05-15T00:00:00"),
            "endDate" : new Date("2017-05-15T00:00:00"),
            "signer" : signer
    });

    //Add additional familes here if you keep the same format the residents will be added to the apartments list automatically

//Add residents to apartments list
var leases = db.Leases.find({"endDate" : {$gt: new Date()}}).toArray();//leases that havet expired

for(var i = 0; i < leases.length; i++)
{
  addResidents(leases[i]);
}
function addResidents(lease)
{
    //grab its apartment from database
     var apartment = db.Apartment.findOne({"_id": lease.apartment})
     //grab array of people who now stay there
     var residents = db.Residents.find({"apartment": lease.apartment},{"_id": 1 ,"firstName" : 1, "lastName" :1}).toArray();
     //set that array up in the apt
     db.Apartment.update({"_id": lease.apartment}, {$set:{"residents": residents}});

     var firstTimeIn = lease.startDate;
     for(var i = 0; i < residents.length; i++)
     {
        db.Residents.update({"_id" : residents[i]._id}, {$set:{"timeIn.0":firstTimeIn}});
     }
}
//Employees Collection
var dylan =
{
    "firstName" : "dylan",
    "lastName" : "Sprouse",
    "sex" :"male",
    "dateOfBirth" : new Date("1992-04-08"),
    "race" : "White",
    "position" : "front desk",
    "previousOccupation":"child actor"
};
var cole =
{
    "firstName" : "cole",
    "lastName" : "Sprouse",
    "sex" :"male",
    "dateOfBirth" : new Date("1992-04-08"),
    "race" : "White",
    "position" : "front desk",
    "previousOccupation":"child actor"
};
db.Employee.insert(dylan);
db.Employee.insert(cole);
//Add leasers to leases
var allLeases =   db.Leases.find({}).toArray();//return all leases
var dylansID = db.Employee.findOne({"firstName": dylan.firstName});
for(var i = 0 ; i < allLeases.length; i ++)
{
    //let dylan sign all the leases since he is the big brother
    db.Leases.update({"_id":allLeases[i]._id}, {$set:{"leaser":dylansID}})
}

//AddTimes to TimeStamp collections

//scheduled events for each resident will triger a timestamp to be added
//scheduled events will be on based on the days of the week, e.g. genji goes to work on monday at 8
//when this script is ran it will use the date as focal point and simulate the prior 4 days
var todaysDate = new Date()
var today = todaysDate.getDay(); //sunday = 0 saturday = 6
var milisecondsPerDay = 86400*1000;

for(var i = 0; i < 4; i ++)
{
    if(today = 0)//if today is sunday manually reset to saturday
    {
        today = 6;
    }
    else
    {
        today--;
    }
    simulateDay(i, today);

}


function simulateDay(itteration, today)//simulates the timestamps of one day of the week and the date is based on the current ate
{

    var date = todaysDate.getTime();
    date -= (itteration*milisecondsPerDay);// subtract a number of days from current day to match var today
    var timeStamp = new Date();
    timeStamp.setTime(date);//create date and day for time stamp

    //pass the day and itteration to each of the four family in this script
    family1Schedule(timeStamp);
    family2Schedule(timeStamp, date);
    family3Schedule(timeStamp);
    family4Schedule(timeStamp);
}
function family1Schedule(timeStamp)
{
    var momId = db.Residents.findOne({"firstName": mom.firstName}, {"firstName": 1});// I just want the _id
    var sonId = db.Residents.findOne({"firstName": son.firstName}, {"firstName": 1});

    if (today >= 1 || today < 6)//monday through friday
    {
        //mom leaves for work at 8am; son leaves for school at 7
        db.TimeStamp.save(
            {
                "residentID": momId._id,
                "name": momId.firstName,
                "arriving": false,
                "timeStamp": timeStamp.setHours(8)
            });
        db.TimeStamp.save(
            {
                "residentID": momId._id,
                "name": momId.firstName,
                "arriving": true,
                "timeStamp": timeStamp.setHours(17)
            });
        db.TimeStamp.save(
            {
                "residentID": sonId._id,
                "name": sonId.firstName,
                "arriving": false,
                "timeStamp": timeStamp.setHours(7)
            });
        db.TimeStamp.save(
            {
                "residentID": sonId._id,
                "name": sonId.firstName,
                "arriving": true,
                "timeStamp": timeStamp.setHours(16)
            });
        //if its thursday they get pizza together at 7
        if(today == 4)
        {
            db.TimeStamp.save(
                {
                    "residentID": momId._id,
                    "name": momId.firstName,
                    "arriving": false,
                    "timeStamp": timeStamp.setHours(19)
                });
            db.TimeStamp.save(
                {
                    "residentID": sonId._id,
                    "name": sonId.firstName,
                    "arriving": false,
                    "timeStamp": timeStamp.setHours(19)
                });

            db.TimeStamp.save(
                {
                    "residentID": momId._id,
                    "name": momId.firstName,
                    "arriving": true,
                    "timeStamp": timeStamp.setHours(21)
                });
            db.TimeStamp.save(
                {
                    "residentID": sonId._id,
                    "name": sonId.firstName,
                    "arriving": true,
                    "timeStamp": timeStamp.setHours(21)
                });
        }
    }
    //Saturday son watch cartoons all day and video games. mom goes shopping
    if(today == 6)
    {
        db.TimeStamp.save(
            {
                "residentID": momId._id,
                "name": momId.firstName,
                "arriving": false,
                "timeStamp": timeStamp.setHours(12)
            });
        db.TimeStamp.save(
            {
                "residentID": momId._id,
                "name": momId.firstName,
                "arriving": true,
                "timeStamp": timeStamp.setHours(17)
            });
    }
    //sundays they go to church and go out to dinner
    if(today == 7)
    {
        db.TimeStamp.save(
            {
                "residentID": momId._id,
                "name": momId.firstName,
                "arriving": false,
                "timeStamp": timeStamp.setHours(8)
            });
        db.TimeStamp.save(
            {
                "residentID": momId._id,
                "name": momId.firstName,
                "arriving": true,
                "timeStamp": timeStamp.setHours(14)
            });

        db.TimeStamp.save(
            {
                "residentID": momId._id,
                "name": momId.firstName,
                "arriving": false,
                "timeStamp": timeStamp.setHours(18)
            });
        db.TimeStamp.save(
            {
                "residentID": momId._id,
                "name": momId.firstName,
                "arriving": true,
                "timeStamp": timeStamp.setHours(20)
            });

        db.TimeStamp.save(
            {
                "residentID": sonId._id,
                "name": sonId.firstName,
                "arriving": false,
                "timeStamp": timeStamp.setHours(8)
            });
        db.TimeStamp.save(
            {
                "residentID": sonId._id,
                "name": sonId.firstName,
                "arriving": true,
                "timeStamp": timeStamp.setHours(14)
            });
        db.TimeStamp.save(
            {
                "residentID": sonId._id,
                "name": sonId.firstName,
                "arriving": false,
                "timeStamp": timeStamp.setHours(18)
            });
        db.TimeStamp.save(
            {
                "residentID": sonId._id,
                "name": sonId.firstName,
                "arriving": true,
                "timeStamp": timeStamp.setHours(20)
            });
    }
}
function family2Schedule(timeStamp, date)
{
    var womanId = db.Residents.findOne({"firstName": woman.firstName}, {"firstName": 1});
    //monday through friday she goes to campus to learn something
    if (today >= 1 || today < 6)
    {
        db.TimeStamp.save(
            {
                "residentID": womanId._id,
                "name": womanId.firstName,
                "arriving": false,
                "timeStamp": timeStamp.setHours(12)
            });
        db.TimeStamp.save(
            {
                "residentID": womanId._id,
                "name": womanId.firstName,
                "arriving": true,
                "timeStamp": timeStamp.setHours(16)
            });
    }
        if(today== 0 || today>3  ) // thursday - sunday she works
        {

                db.TimeStamp.save(
                    {
                        "residentID": womanId._id,
                        "name": womanId.firstName,
                        "arriving": false,
                        "timeStamp": timeStamp.setHours(21)
                    });
                db.TimeStamp.save(
                    {
                        "residentID": womanId._id,
                        "name": womanId.firstName,
                        "arriving": true,
                        "timeStamp": timeStamp.setHours(26)
                    });
                timeStamp.setTime(date); //reset timestamp
        }
    //she schools all day and works all night she has no time for anything else
}

function family3Schedule(timeStamp)
{
    var momId = db.Residents.findOne({"firstName": mommy.firstName}, {"firstName": 1});
    var dadId =  db.Residents.findOne({"firstName": dad.firstName}, {"firstName": 1});
    var baby =  db.Residents.findOne({"firstName": babyGirl.firstName}, {"firstName": 1});
    //monday through friday the parents work and baby is in daycare

    if (today >= 1 || today < 6)
    {
        db.TimeStamp.save(
            {
                "residentID": dad._id,
                "name": dad.firstName,
                "arriving": false,
                "timeStamp": timeStamp.setHours(5)
            });
        db.TimeStamp.save(
            {
                "residentID": momId._id,
                "name": momId.firstName,
                "arriving": false,
                "timeStamp": timeStamp.setHours(7)
            });
        db.TimeStamp.save(
        {
            "residentID": baby._id,
            "name": baby.firstName,
            "arriving": false,
            "timeStamp": timeStamp.setHours(7)
        });
        db.TimeStamp.save(
            {
                "residentID": momId._id,
                "name": momId.firstName,
                "arriving": true,
                "timeStamp": timeStamp.setHours(8)
            });
        db.TimeStamp.save(
            {
                "residentID": momId._id,
                "name": momId.firstName,
                "arriving": false,
                "timeStamp": timeStamp.setHours(11)
            });
        db.TimeStamp.save(
            {
                "residentID": dad._id,
                "name": dad.firstName,
                "arriving": true,
                "timeStamp": timeStamp.setHours(16)
            });
        db.TimeStamp.save(
            {
                "residentID": baby._id,
                "name": baby.firstName,
                "arriving": true,
                "timeStamp": timeStamp.setHours(16)
            });
        db.TimeStamp.save(
            {
                "residentID": momId._id,
                "name": momId.firstName,
                "arriving": true,
                "timeStamp": timeStamp.setHours(22)
            });
    }
    //saturday is date night and the baby stays at home with Big Brother
    if(today == 6)
    {
        db.TimeStamp.save(
            {
                "residentID": dad._id,
                "name": dad.firstName,
                "arriving": false,
                "timeStamp": timeStamp.setHours(19)
            });
        db.TimeStamp.save(
            {
                "residentID": momId._id,
                "name": momId.firstName,
                "arriving": false,
                "timeStamp": timeStamp.setHours(19)
            });
        db.TimeStamp.save(
            {
                "residentID": dad._id,
                "name": dad.firstName,
                "arriving": true,
                "timeStamp": timeStamp.setHours(23)
            });
        db.TimeStamp.save(
            {
                "residentID": momId._id,
                "name": momId.firstName,
                "arriving": true,
                "timeStamp": timeStamp.setHours(23)
            });
    }
    //sunday they stay in the housing and picnic in there yard or something
}
function  family4Schedule(timeStamp) {
    var olderId = db.Residents.findOne({"firstName": older.firstName}, {"firstName": 1});
    var youngerId = db.Residents.findOne({"firstName": younger.firstName}, {"firstName": 1});
    var friendId = db.Residents.findOne({"firstName": friend.firstName}, {"firstName": 1});

    //weekdays the brothers work and the friend trains twice a day
    if (today >= 1 || today < 6)
        {
            db.TimeStamp.save(
                {
                    "residentID": olderId._id,
                    "name": olderId.firstName,
                    "arriving": false,
                    "timeStamp": timeStamp.setHours(9)
                });
            db.TimeStamp.save(
                {
                    "residentID": olderId._id,
                    "name": olderId.firstName,
                    "arriving": true,
                    "timeStamp": timeStamp.setHours(17)
                });
            db.TimeStamp.save(
                {
                    "residentID": youngerId._id,
                    "name": youngerId.firstName,
                    "arriving": false,
                    "timeStamp": timeStamp.setHours(4)
                });
            db.TimeStamp.save(
                {
                    "residentID": youngerId._id,
                    "name": youngerId.firstName,
                    "arriving": true,
                    "timeStamp": timeStamp.setHours(15)

                });
            db.TimeStamp.save(
                {
                    "residentID": friendId._id,
                    "name": friendId.firstName,
                    "arriving": false,
                    "timeStamp": timeStamp.setHours(5)
                });
            db.TimeStamp.save(
                {
                    "residentID": friendId._id,
                    "name": friendId.firstName,
                    "arriving": true,
                    "timeStamp": timeStamp.setHours(8)

                });

            db.TimeStamp.save(
                {
                    "residentID": friendId._id,
                    "name": friendId.firstName,
                    "arriving": false,
                    "timeStamp": timeStamp.setHours(2)
                });
            db.TimeStamp.save(
                {
                    "residentID": friendId._id,
                    "name": friendId.firstName,
                    "arriving": true,
                    "timeStamp": timeStamp.setHours(4)

                });
        }

    if(today == 2 || today == 4)// tues. and thurs. pizzaeria night aka cheat days
    {
        db.TimeStamp.save(
            {
                "residentID": olderId._id,
                "name": olderId.firstName,
                "arriving": false,
                "timeStamp": timeStamp.setHours(19)
            });
        db.TimeStamp.save(
            {
                "residentID": olderId._id,
                "name": olderId.firstName,
                "arriving": true,
                "timeStamp": timeStamp.setHours(21)
            });
        db.TimeStamp.save(
            {
                "residentID": youngerId._id,
                "name": youngerId.firstName,
                "arriving": false,
                "timeStamp": timeStamp.setHours(19)
            });
        db.TimeStamp.save(
            {
                "residentID": youngerId._id,
                "name": youngerId.firstName,
                "arriving": true,
                "timeStamp": timeStamp.setHours(21)

            });
        db.TimeStamp.save(
            {
                "residentID": friendId._id,
                "name": friendId.firstName,
                "arriving": false,
                "timeStamp": timeStamp.setHours(19)
            });
        db.TimeStamp.save(
            {
                "residentID": friendId._id,
                "name": friendId.firstName,
                "arriving": true,
                "timeStamp": timeStamp.setHours(21)

            });
    }
    //saturdays they go watch the friend fight and come back  sunday noon  and hibernate
    if(today == 6)
    {
        db.TimeStamp.save(
            {
                "residentID": olderId._id,
                "name": olderId.firstName,
                "arriving": false,
                "timeStamp": timeStamp.setHours(6)
            });
        db.TimeStamp.save(
            {
                "residentID": olderId._id,
                "name": olderId.firstName,
                "arriving": true,
                "timeStamp": timeStamp.setHours(30)
            });
        db.TimeStamp.save(
            {
                "residentID": youngerId._id,
                "name": youngerId.firstName,
                "arriving": false,
                "timeStamp": timeStamp.setHours(6)
            });
        db.TimeStamp.save(
            {
                "residentID": youngerId._id,
                "name": youngerId.firstName,
                "arriving": true,
                "timeStamp": timeStamp.setHours(30)

            });
        db.TimeStamp.save(
            {
                "residentID": friendId._id,
                "name": friendId.firstName,
                "arriving": false,
                "timeStamp": timeStamp.setHours(6)
            });
        db.TimeStamp.save(
            {
                "residentID": friendId._id,
                "name": friendId.firstName,
                "arriving": true,
                "timeStamp": timeStamp.setHours(30)

            });
    }
}