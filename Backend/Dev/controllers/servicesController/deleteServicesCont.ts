/**
 * @author Shubham Chauhan <sh572302@dal.ca/B00945891>
 */

// controller.ts
import { Request, Response } from 'express';
import Services from '../../models/servicesModel';


// Controller function to delete existing service
export const deleteService = async (req: Request, res: Response) => {
  const { _id } = req.body; // Assuming the _id value is passed as a parameter in the URL
  
  try {
    // Assuming DataModel is the Mongoose model representing the collection in MongoDB
    const deletedData = await Services.findByIdAndDelete(_id);

    if (!deletedData) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.status(200).json({ message: 'Service deleted successfully', deletedData });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }

}

export default {
  deleteService
}