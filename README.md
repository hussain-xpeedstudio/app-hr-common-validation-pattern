# AppHR Common Validation Pattern

This repository contains two projects: `lara-api` and `react-font`. The `lara-api` project provides an API that returns Laravel validation rules. The `react-font` project fetches this API and uses the response data to validate Laravel forms. Additionally, there's a convenient script to start both projects.

## Prerequisites

Before you get started, ensure you have the following prerequisites:

- Docker installed on your system.
- Git to clone this repository.

## Getting Started

1. Clone this repository to your local machine:

   ```shell
   git clone https://github.com/hussain-xpeedstudio/app-hr-common-validation-pattern.git
   cd lara-api-react-font-validation



## Make the `run.sh` script executable:
`chmod +x run.sh`
## Run the `run.sh` script to start the projects:
`./run.sh`
## Open your web browser and visit the link:
1.  http://localhost:3000/

## Project Details

### lara-api - Laravel API
- The **lara-api** project serves as an API that returns Laravel validation rules.
- It is built using Laravel.

### react-font - React Font
- The **react-font** project is a React application that fetches validation rules from the **lara-api** API.
- It uses the response data to validate Laravel forms on the client side.
- It is built using React.

## Customization

You can customize both projects to fit your needs. Feel free to modify the validation rules and the React components as required.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.