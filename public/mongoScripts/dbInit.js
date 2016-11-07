//for the field 'timeIn' it will be intialized by the first day of the lease

var conn = new Mongo();

var db = conn.getDB("BigBrother");

//create apartments
var apartment;
for(var i = 1; i< 13; i++);//make 12 apartments
{
    apartment = {"aptNumber": i, "lease": null, "residents": []};
    db.Apartments.save(apartment);
}
//
//Construct families that make up residents
    //Family 1, Single Mom with teenage kid, Apartment 1
    var mom =
    {
        "firstName" : "Erika",
        "lastName" : "Romagnoli",
        "sex" :"female",
        "dateOfBirth" : new Date("1975-12-08"),
        "race" : "Black",
        "occupation" : "Software Developer",
        "salary": "88000.00",
        "apartment" : "1",
        "timeIn" : [],
        "timeOut" : []

    };
    var son =
    {
        "firstName" : "David",
        "lastName" : "Romagnoli",
        "sex" :"male",
        "dateOfBirth" : new Date("2000-06-21"),
        "race" : "Black",
        "apartment" : "1",
        "timeIn" : [],
        "timeOut" : []
    };

    db.Residents.save(mom);
    db.Residents.save(son);

    var signer = db.Residents.find({"firstName" : "Erika", "lastName" : "Romagnoli"},{});//should return object id

    db.Leases.save(
        {
            "rent" : "735.22",
            "aparment" : "1",
            "startDate" : new Date("2016-01-5"),
            "endDate" : new Date("2017-01-5"),
            "signer" : signer
    });
//
//Add residents to apartments list
//