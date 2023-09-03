/**
 * @author Shubham Chauhan <sh572302@dal.ca/B00945891>
 */

// controller.ts
import { Request, Response } from 'express';
import Services from '../../models/servicesModel';


// Controller function to save new service
export const saveService = async (req: Request, res: Response) => {

    console.log("Save Services called");
    const { serviceName, time, price, description, code, percentage, serviceType, mentorId } = req.body; // Getting data from the body of the request
    console.log("Service data", { serviceName, time, price, description, code, percentage, serviceType, mentorId });
    try {

      // Creating a new service object.
      const newData = new Services({ serviceName, time, price, description, code, percentage, serviceType, mentorId });
      console.log("saving sarive...", newData);
      const savedData = await newData.save();
      console.log('Data saved');
      res.status(200).json(savedData);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error'+error });
    }
};


  



export default {
    saveService
}