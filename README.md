# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment



### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)



# Project Overview
NEW FINANCE is a comprehensive business analysis web application designed to help users manage and forecast their financial data efficiently. With features for uploading and manually inputting data, the app provides robust analysis using the ARIMA model and offers a user-friendly interface for navigating different financial operations.
This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)


## Usage

### Dashboard
**Overview:** Displays total revenue, rate, and other financial metrics.
**Navigation:** Use the left-side panel to navigate to different sections of the app.

### Analyze
**Upload Spreadsheet:** Click on the 'Upload' button to upload a spreadsheet file with financial data.
**Forecasting:** Forecast of 30 days from present by analyzing the data through ARIMA

### Forecasting
**Analysis:** Navigate to the 'Forecasting' section to view the ARIMA model analysis and forecasted data.
**Visualization:** The forecasted data is presented in an easy-to-understand graph format.

### Expense Management
**Record Expenses:** Navigate to the 'Expenses' section to record new expenses.
**View History:** Historical expenses are displayed for reference and analysis.

### Income Management
**Record Income:** Navigate to the 'Income' section to record new income entries.
**View History:** Historical income entries are displayed for reference and analysis.

### API Endpoints
Forecasting Endpoint

## Dependencies
**Node.js:** JavaScript runtime environment.
**Express.js:** Web framework for Node.js.
**React.js:** Frontend library for building user interfaces.
**Axios:** Promise-based HTTP client for the browser and Node.js.
**pandas:** Data analysis and manipulation library for Python.
**statsmodels:** Statistical modeling library for Python.
**ARIMA:** Time series forecasting model.

