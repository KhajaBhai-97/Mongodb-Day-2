1, Find all the topics and tasks which are thought in the month of October?

            db.topics.find({ date: {$regex: "-10-"}});
            db.tasks.find({ assigned_date: {$regex: "-10-"}});


2, Find all the company drives which appeared between 15 oct-2020 and 31-oct-2020?

            db.company_drives.find({drive_date: {$lt: "2020-10-31", $gt: "2020-10-15"}});



3, Find all the company drives and students who are appeared for the placement?

            const data = db.company_drives.find({}, { _id: 0 }).toArray();
            let arr = [];
            let fData = data.map(x => { let attendee = db.users.find({mail: {$nin:x.drive_absentees}},{name:1, _id: 0}).toArray();arr.push({company: x.company, appeared_students:attendee}); return arr;});
            console.log(fData);




4, Find the number of problems solved by the user in codekata?

            db.users.find({}, {name: 1, codekata: 1, _id: 0})


5, Find all the mentors with who has the mentee's count more than 15?


            db.users.aggregate([
                {
                    $group: {
                        _id: "$mentor.email",
                        mentees_count: {$sum: 1}
                    }
                },
                {
                    $match: {
                        mentees_count: {$gt: 15}
                    }
                }
            ])


6, Find the number of users who are absent and task is not submitted  between 15 oct-2020 and 31-oct-2020?

            db.attendence.aggregate([
                {
                    $match: {
                        date : {
                            $lt: "2020-10-31",
                            $gt: "2020-10-15"
                          }
                    }
                },
                {
                    $group: {
                        _id: "$absentees",
                    }
                },
                {
                    $project: {
                         _id: 0,
                         absentees: "$_id"
                    }
                }
            ])


