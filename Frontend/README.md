# Assignment-3

Our project, Learnly, aims to simplify personalized interactions by providing a platform for professionals to manage incoming requests for advice or guidance. It allows individuals to connect with professionals and seek personalized interactions, allowing knowledge and wisdom to be shared in a simplified and seamless manner.

- Date Created: 26 July 2023
- Last Modification Date: 26 July 2023
- Deployed application URL: <https://csci5709-group10-learnly.netlify.app/>
- GIT URL: <https://git.cs.dal.ca/taranjots/csci-5709-grp-10>

## Authors

- [Taranjot Singh (tr548284@dal.ca)](https://git.cs.dal.ca/taranjots)
- [Shivam Lakhanpal (sh475218@dal.ca)](https://git.cs.dal.ca/slakhanpal)
- [Amanjot Singh (am854663@dal.ca)](https://git.cs.dal.ca/amanjots)
- [Shubham Chauhan (shubhamchauhan@dal.ca)](https://git.cs.dal.ca/shubhamc)
- [Aadith Shameel (ad766375@dal.ca)](https://git.cs.dal.ca/shameel)

## Features

The following are the features that are developed by our team for the A3:

- Availability Calendar (Taranjot Singh)
- User Profile Management(Amanjot Singh)
- Queries Management (Shubham Chauhan)
- Raise an Issue (Aadith Shameel)
- Student-Mentor meeting booking system (Shivam Lakhanpal)

NOTE: We have not focused much on responsiveness in this assignment since it was not part of the rubric, but we will make our website responsive as part of the final project. Currently, it only works for 1440px (Laptop L).

## Login Details

1.  - email: taran@example.com
    - pass: Taran123

2.  - email: shubham@gmail.com
    - pass: testpass

## Folder Structure

The reason for using a different folder structure in our project is to enhance code organization, maintainability, and reusability. By logically grouping related files into separate folders, we can achieve a decoupled and modular codebase. This allows us to work on specific components or features without affecting others, resulting in a more efficient development process.

For frontend development, the hierarchical folder structure helps us easily locate and manage assets like CSS, JavaScript, images, and fonts. This separation of concerns ensures a clear distinction between different elements of the frontend, making the code more readable and facilitating collaboration with other team members.

Similarly, in backend development, separating TypeScript (development code) and JavaScript (production code) into different folders enables me to distinguish between the two environments. This separation enhances code readability and simplifies the transition from development to production.

Additionally, a well-organized folder structure promotes code reuse. We can easily integrate them into various parts of the application, reducing redundancy and optimizing overall code efficiency.

## Testing

In the context of my application, the end-to-end tests & coding style tests which I went through are described below:

### End to End Tests:

1. Registration and Valid information

   a. Test: Registration with Valid Information

   - Expectation:
     The user should be able to successfully register by entering valid personal information, and a new user account should be created in the system. A confirmation email should be sent to the user, and upon clicking the confirmation link, the account should be activated. The user should be able to log in with their registered credentials.

   b. Test: Registration with Invalid Email Format

   - Expectation:
     When the user enters an invalid email format, such as missing the '@' symbol, an error message should be displayed indicating the invalid format. The system should allow the user to correct the email format and proceed with the registration process. After successful registration, the user should receive a confirmation email and be able to activate their account.

   c. Test: Login with Correct Credentials

   - Expectation: Upon entering the correct email and password combination, the system should verify the credentials and grant access to the user's account. The user should be redirected to their account dashboard, indicating a successful login.

   d. Test: Login with Incorrect Password

   - Expectation: When the user enters the correct email but an incorrect password, the system should detect the incorrect password and display an error message. The user should be allowed to re-enter the correct password and upon successful login, be redirected to their account dashboard.

e. Test: Profile Editing

-Expectation:The user should be able to access the "Account Settings" or "Profile Editing" section and modify their profile information. Changes made to fields such as name, email, about you, and display name should be successfully updated in the system. The updated information should be reflected in the user's profile and account details. Additionally, any validations on the frontend and backend should be in place to ensure data integrity and accuracy during the profile editing process.

e. Test: Account Activation with Expired Confirmation Link

- Expectation: By delaying the click on the confirmation link received via email, the system should recognize and handle the expired link properly. An error message should be displayed indicating the link has expired. The user should be prompted to request a new confirmation email to activate their account, and upon receiving the new email and clicking the confirmation link, the account should be successfully activated.

2. Saving/Updating Default Schedule (Availability Calendar)

- Test: Fill in the necessary fields on the Availability Calendar to set a default schedule, make changes, and click the save button.

- Expectation: Verify that a success message is displayed, indicating that the default schedule has been saved successfully in the MongoDB database. Also, the updated default schedule is reflected on the AvailableCalendar component.

3. Saving/Updating Alternate Schedule (Availability Calendar)

- Test: Fill in the necessary fields on the Availability Calendar to set an alternate schedule, make changes, and click the save button.

- Expectation: Verify that a success message is displayed, indicating that the alternate schedule has been saved successfully in the MongoDB database. Also, the updated alternate schedule is reflected on the AvailableCalendar component.

4. Saving/Updating Unavailable Dates (Availability Calendar)

- Test: Select the necessary dates by clicking "Add Unavailable Dates". Then, select some dates & click "Block Dates".

- Expectation: Verify that a success message is displayed, indicating that the block dates has been saved successfully in the MongoDB database. Also, the updated dates are reflected on the calendar.

5. Saving/Updating Calendar Settings (Availability Calendar)

- Test: Select the necessary fields by clicking "Calendar Settings" & click "Save Calendar Settings".

- Expectation: Verify that a success message is displayed, indicating that the calendar settings has been saved successfully in the MongoDB database. Also, the updated settings are reflected on the calendar.

6. Creating an Issue (Report an Issue Feature)

- Test: Entering issue information by clicking "Report an Issue" button, entering issue title and description, and pressing "Submit" button.

- Expectation: Takes input from user, uploads it to the MongoDB database, and sends a success message after being saved. Then the user is sent back to the main issues page.

7. Update an Issue ()

- Test: Clicking on the issue, editing the issue information, pressing the “update” button.

- Expectation: Receives info about the issue that the user clicks, gives user the form to update issue, and on press of “update” button saves the updated data.

8. Delete an Issue ()

- Test: Clicking on an issue and pressing the "Delete" button.

- Expectation: Receives info about the issue selected by user, and calls the delete API to delete it from the MongoDB database.

9. Test: Service Selection

   - Expectation: When a service is selected on the service page, the user is redirected to the booking details page with correct service details transferred.

10. Test: Booking Creation

    - Expectation: On the booking details page, the form should require all student information fields to be filled. Upon confirming the booking, the booking should be created in the backend with the 'isPaid' status set to false.

11. Test: Payment Process

    - Expectation: The payment page should validate inputs for a 16-digit card number, a 3-digit CVV, and a non-empty card holder's name. Upon successful payment, the app should redirect to the landing page, and a confirmation email should be sent to the user.

12. Pending Queries Display:

Expectation: When Queries are opened, pending queries for that user should be displayed, providing a clear and organized view of outstanding issues.

13. Queries Status Update:

Expectation: When a response is sent, queries should be promptly moved to the Answered tab, and the corresponding data must be accurately updated in the DB to ensure efficient query tracking and resolution.

14. Mail Notification:

Expectation: Upon sending a response to a query, an automatic mail notification should be promptly sent to the user, ensuring that they are informed about the resolution or further action required.

15. Deletion of Queries:

Expectation: When Queries are deleted, they should be instantly removed from the system's DB, ensuring that irrelevant or resolved queries are not retained unnecessarily, maintaining data cleanliness and storage efficiency.

### Coding Style Tests:

1. Code formatting: Ensure that the code follows consistent indentation, spacing, and line wrapping rules. This helps improve code readability and maintainability.

- Example: Check that the components use consistent indentation with proper alignment of elements and logical grouping of code blocks.

2. Naming conventions: Verify that variables, functions, and components follow appropriate naming conventions for clarity and consistency.

- Example: Ensure that the names of functions and variables in the AvailableCalendar and Sidebar components are descriptive and follow a consistent naming convention, such as camelCase or PascalCase.

3. Modularity and organization: Assess how well the code is structured and organized, promoting maintainability and reusability.

- Example: Check that the code within the components is logically grouped, with related functions or styles placed together, and that code duplication is minimized.

## Deployment

# Frontend

To deploy the project environment, We have used Netlify. The steps we followed for the deployment are as follows:

1. Pushed our code to a GitHub repository.
2. Login to Netlify account with Github.
3. Selected the repository we want to deploy.
4. Configured the site settings, such as providing a name for the site, etc.
5. Clicked on the "Deploy site" button. The site was deployed within a few minutes. The link to the code and the deployed site is also
   provided above.

Note: Ensure that the code is properly pushed to the GitHub repository before proceeding with the Netlify deployment.

# Backend

To deploy the project environment, We have used Render. The steps we followed for the deployment are as follows:

1. Pushed our code to a GitHub repository.
2. Login to Render account with Github.
3. Selected the repository we want to deploy.
4. Configured the site settings, such as providing a name for the site, etc.
5. Clicked on the "Deploy site" button. The site was deployed within a few minutes. The link to the code and the deployed site is also
   provided above.

Note: Ensure that the code is properly pushed to the GitHub repository before proceeding with the Render deployment.

## Known Issue

1. After deploying the application using Netlify & Render, some part of our UI is breaking especially Availability Calendar page.
2. After login, user is redirected to the landing page as Dashboard page will be developed as part of next feature.

## Built With

- [Node.js](https://nodejs.org/en/download) - Dependency Management.
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) - Package Management.
- [React](https://react.dev/learn/installation) - Used it to build the user interface (UI) and manage the
  application's component-based architecture.
- [Material-UI](https://mui.com/) - Used it's components like FormControlLabel, ThemeProvider, Checkbox,
  MenuItem, etc to create a visually appealing and responsive web application.
- [Postman](https://www.postman.com/downloads/) - Backend APIs Testing was done by using Postman.
- [MongoDB](https://www.mongodb.com/try/download/community) - Document-Oriented NoSQL database.

NOTE: We need to have Node.js installed, which includes npm, in order to install and use React and Material-UI in our project.
