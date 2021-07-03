# Chamba CRM
>A Business CRM with Modern/Simple UI. Store customer information and other documents(e.g., invoices) in a user-friendly dashboard.  NextJs framework is used on the Front-end. And the Back-end is built with Ruby on Rails.

>available features
>- manage clients
>- create and assign invoices to clients
>
>pending features
>- scheduling capabilities
>- add staff to business and assign multiple roles
>- client login access
>- payment processing
>- task manager


**Table of Contents**  

- [Chamba CRM](#chamba-crm)
  - [Technology Stack](#technology-stack)
  - [Installation](#installation)
  - [Operation](#operation)
  - [Live Preview](#live-preview)
  - [Screenshot](#screenshots)

## Technology Stack
1. React
2. Material UI
3. React Hook Form
4. React Query
5. Redux
6. Next JS

## Installation
1. Download and run project backend - [go to backend repo](https://github.com/chrislemus/service-field-crm-api)
2. Download the repository
3. Install dependencies `npm install`
4. Run project `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000) to view it in the browser
6. Create a new account or login using the following credentials:
    - Email: me@me.com 
    - Password: Aaaaaaaa123
## Operation
Once logged, navigate through the app using the left navigation panel. 

The customer panel will provide all information about the customer and an overview of associated data/documents such as pending/paid invoices. You can also add a new client by name and add additional information later.

Invoices can be created by navigating to the invoices tab and clicking on the `New Invoice` button located on the top right. You must assign the invoice to an existing client, which can be done by searching for the client by name using the search bar and selecting an existing client. 


## Live Preview
[Check out the live demo here!](https://www.chrislemus.io/project-demo/2)


## Screenshots

### User Authentication
![user-log-in](https://github.com/chrislemus/chamba/blob/main/project-screenshots/login-in.gif)

### Update Client
![client-update](https://github.com/chrislemus/chamba/blob/main/project-screenshots/updating-client-name.gif)

### Assign Invoices
![create-invoice](https://github.com/chrislemus/chamba/blob/main/project-screenshots/creating-invoice.gif)
