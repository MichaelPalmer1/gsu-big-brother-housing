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
        "timeOut" : []

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
        "timeOut" : []
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
        "timeOut" : []

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
    var mom =
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
        "timeOut" : []

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
        "timeOut" : []

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
        "timeOut" : []

    };

    db.Residents.save(mom);
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
        "timeOut" : []

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
        "timeOut" : []

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
        "timeOut" : []

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
var leases = db.Leases.find({"endDate" : {$gt: Date()}}).toArray();//leases that havet expired

for(var i = 0; i < leases.length; i++)
{
  addResidents(leases[i]);
}
function addResidents(lease)
{
    //grab its apartment from database
     var apartment = db.Apartment.findOne({"_id": lease.apartment})
     //grab array of people who now stay there
     var residents = db.Residents.findOne({"apartment": lease.apartment},{"_id": 1 ,"firstName" : 1, "lastName" :1}).toArray();
     //set that array up in the apt
     db.Apartment.update({"_id": lease.apartment}, {$set:{"residents": residents}})

     var firstTimeIn = lease.startDate;
     for(var i = 0; i < residents.length; i++)
     {
        db.Residents.update({"_id" : residents[i]._id}, {$set:{"timeIn.0":firstTimeIn}});
     }
}
//
