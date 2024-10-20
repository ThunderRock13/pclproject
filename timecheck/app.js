const moment = require('moment');
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI; // Use the environment variable
const client = new MongoClient(uri);

const updateTasks = async () => {
    try {
        await client.connect();
        const database = client.db('test'); // Replace with your database name
        const tasksCollection = database.collection('tasks');

        const tasks = await tasksCollection.find({}).toArray();

        for (let task of tasks) {
            const dueDate = new Date(task.date);
            const now = new Date();

            // Check if the task is completed
            if (task.completed) {
                task.isPast = false; // If completed, isPast should be false
                console.log(`Task ${task.name} is completed. Updating!`);

                // No need to calculate time left or due date if completed
                await tasksCollection.updateOne(
                    { _id: task._id },
                    { $set: { isPast: task.isPast } }
                );
            } else {
                // Task is not completed, proceed to check if it's past due
                if (dueDate > now) {
                    // Task is future
                    task.isPast = false;

                    // Calculate time remaining
                    const duration = moment.duration(dueDate - now);
                    const days = Math.floor(duration.asDays());
                    const hours = Math.floor(duration.asHours() % 24);
                    const minutes = Math.floor(duration.asMinutes() % 60);

                    // Create the time left string
                    const timeLeftString = `${Math.abs(days)}d ${Math.abs(hours)}h ${Math.abs(minutes)}m left`;

                    // Format the due date and time
                    const formattedDueDate = moment(dueDate).format('MM/DD/YY @ hh:mm A');
                    const pDateString = `Due: ${formattedDueDate}`;
                    console.log(`Updating task ${task.name}`);

                    // Update the task in the database
                    await tasksCollection.updateOne(
                        { _id: task._id },
                        { $set: { isPast: task.isPast, timeLeft: timeLeftString, pDate: pDateString } }
                    );
                } else {
                    // Task is past due
                    task.isPast = true;
                    console.log(`Task ${task.name} is past due. Updating!`);

                    // Only set isPast without changing timeLeft or pDate
                    await tasksCollection.updateOne(
                        { _id: task._id },
                        { $set: { isPast: task.isPast } }
                    );
                }
            }
        }
    } catch (err) {
        console.error('Error updating tasks:', err);
    } finally {
        await client.close();
    }
};

// Call the function to update tasks every 5 seconds
setInterval(updateTasks, 5000); // Run every 5 seconds
