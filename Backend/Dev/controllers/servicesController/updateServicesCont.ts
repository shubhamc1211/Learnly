/**
 * @author Shubham Chauhan <sh572302@dal.ca/B00945891>
 */

// controller.ts
import { Request, Response } from 'express';
import Services from '../../models/servicesModel';


// Controller function to update existing service
export const updateService = async (req: Request, res: Response) => {
    console.log("Update Services called");
    const { serviceName, time, price, description, code, percentage, serviceType, mentorId } = req.body;
    console.log("Updated service data", { serviceName, time, price, description, code, percentage, serviceType, mentorId });
  
    try {
      const serviceId = req.body._id; // Assuming the serviceId is passed as a route parameter
      const updatedData = await Services.findByIdAndUpdate(
        serviceId,
        { serviceName, time, price, description, code, percentage, serviceType, mentorId },
        { new: true } // Set this to get the updated document as the result
      );
  
      if (!updatedData) {
        return res.status(404).json({ error: 'Service not found' });
      }
  
      console.log('Service updated');
      res.status(200).json(updatedData);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' + error });
    }
  };


export default {
    updateService
}