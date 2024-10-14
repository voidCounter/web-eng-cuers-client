# CUERS
+ Note: This is the front-end section of the CUERS (Chittagong University Exam Remuneration System). The back-end section of the system is maintained privately in a shared repository.
## Table of Contents
- [Overview](#overview)
- [Installation](#installation)
- [Features](#features)
- [Getting Started](#getting-started)
- [Acknowledgements](#acknowledgements)
- [Contribution](#contribution)
## Overview
**CUERS** is a web-based digital exam remuneration system with a centralized database, containing all information about the evaluators (teachers) and exam-committee members of each department of the University of Chittagong. In an effort to generate the remuneration forms and subsequently the bills of each evaluator correctly, the system significantly reduces the workload and time needed by digitizing the whole process.

## Installation
These instructions will provide you with a local copy of the project for deployment or testing purposes. Make sure to following the steps listed below:
### Cloning Repository
1. Clone the repository into your local system:
```
git clone https://github.com/voidCounter/web-eng-cuers-client.git
```
2. Navigate to your project directories using the command:
```
cd web-eng-cuers-client
```
### Installing Dependencies
1. In your local system, ensure that Node.js & npm are already installed. To check whether they are installed, run the following commands in either your Ubuntu terminal or Windows Command Prompt:
```
#Check npm version
npm -v 

#Check node version
node -v
```
To install either or both of them, please follow the [Node.js](https://nodejs.org/en/download/package-manager "Node.js installation via package manager") and [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm "Downloading and installing Node.js and npm") documentations.

## Features
* Generate full-fledged remuneration bills, by automating bill calculations from provided data.
* Allow insertion, deletion and/or updating data records dynamically and handling noisy data.

## Technologies Used
<div class = "img-display" align = "center">
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" ><img src = "src/assets/javascript.svg" id= "js" height="60px" width="60px"
/></a>
<a href="https://tailwindcss.com/"><img src = "src/assets/tailwindcss.svg" id = "twcss" height="60px" width="60px"
/> </a>
<a href = "https://react.dev/"><img src = "src/assets/react.svg" id="react" height="60px" width="60px"
/> </a>
<a href="https://vitejs.dev/"><img src = "src/assets/vitejs.svg" id="vite" height="60px" width="60px"
/> </a>
</div>

## Acknowledgements
This project has been developed using confidential data records provided by [Dr. Rudra Pratap Deb Nath](https://www.cu.ac.bd/public_profile/index.php?ein=5168), Associate Professor of CSE Dept and [Muhammad Anwarul Azim](https://cu.ac.bd/public_profile/index.php?ein=3904), Professor of CSE Dept of University of Chittagong.

## Contribution
If you would like to contribute to this project, please fork the repository and submit a pull request. When submitting a pull request, please make sure to include unit tests for any new features or bug fixes.
