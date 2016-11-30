db.Residents.find().forEach(
    function (newDoc) 
    {
        newDoc.timeStamps = db.find({"_id":newDoc._id}).toArray();
        db.Residentstemp.insert(newDoc);
    }
);