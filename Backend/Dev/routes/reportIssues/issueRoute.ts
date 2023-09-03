// Author: Aadith Shameel - B00929852
import express from 'express';
import issueController from '../../controllers/reportIssues/issueController';

const router = express.Router();

router.post('/createIssue', issueController.createIssue);
router.get('/getAllIssues/:userName', issueController.getAllIssues);
router.get('/getIssue/:id', issueController.getIssue);
router.put('/updateIssue/:id', issueController.updateIssue);
router.delete('/deleteIssue/:id', issueController.deleteIssue);

export const issueRoute = router;