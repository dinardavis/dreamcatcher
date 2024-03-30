<!-- PROJECT LOGO -->

<br />
<div align="center" id="top">
  <a href="https://github.com/dinardavis/travel_app">
    <img src="public/imgs/favicon.png" alt="Travel Inspiration Dashboard Logo" height="80">
  </a>

<h3 align="center">Travel Dream Dashboard</h3>
     
   <p align="center">
    With the love of travel in mind, this project was created to serve as a one stop shop for travel junkies to get and/or stay excited for their next trip. The functionality is very straightforward; enter the name of a city that you've always dreamed of visiting, the dates that you're available to go there, your return airport, and voila! The dashboard will return the price of a roundtrip flight to that destination, and some other useful info to get your imagination flowing about your next adventure!
    <br />
    <br />
    <a href="https://github.com/dinardavis/travel_app"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://dinardavis.github.io/travel_app/">View Demo</a>
    ·
    <a href="https://github.com/dinardavis/travel_app/issues">Report Bug</a>
    ·
    <a href="https://github.com/dinardavis/travel_app/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#tools">Tools</a></li>
        <li><a href="#setup">Setup</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#future-iterations">Future Iterations</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

<br />

<div align="center">
  <img src="public/imgs/project_thumbnail.png" alt="An Image of the travel dashboard featuring the various components" height="500">
</div>

<br />

<p align="right">(<a href="#top">back to top</a>)</p>



### Built With

* <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
* <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" /> 
* <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" /> 
* <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" /> 
* <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
* <img src="https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=whit" />
* <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />





<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

## Tools

* [git](https://git-scm.com/downloads): A tool for managing source code
* [Visual Studio Code](https://code.visualstudio.com/): A source code editor
* API Keys for: 
    <br />
    * Openweather API
    * Unsplash API
    * Skyscanner API

## Setup

As this application requires several different API keys, if you wish to only view its functionality, it is recommended to visit the [Live Demo](https://dinardavis.github.io/travel_app/), instead of running the application locally. 

However, if you do wish to adapt or make contributions please do the following:

* With git clone the code to your machine, or download a ZIP of all the files directly.

    [Download the ZIP from this location](https://github.com/dinardavis/spacex_clone), or run the following command to clone the files to your machine:

```bash
git clone https://github.com/dinardavis/travel_app
```
* Once you have the files locally, open the _travel_app_ folder in [Visual Studio Code](https://code.visualstudio.com/).

* Sign up and obtain API keys for:
  <br />
    * [Openweather API](https://openweathermap.org/api)
    * [Unsplash API](https://unsplash.com/developers)
    * [Skyscanner API](https://rapidapi.com/DataCrawler/api/skyscanner50/)

* Add API keys and secret to /.env file using the format:

    REACT_APP_OPENWEATHER_API_KEY=[API KEY HERE] <br />
    REACT_APP_UNSPLASH_API_KEY=[API KEY HERE] <br />
    REACT_APP_UNSPLASH_SECRET_KEY=[API SECRET KEY HERE] <br />
    REACT_APP_FLIGHT_API_KEY=[API KEY HERE]

* In the project root directory run: 

```bash
npm install
```

then...


```bash
npm start
```


<p align="right">(<a href="#top">back to top</a>)</p>


<!-- USAGE EXAMPLES -->
## Usage

In this project I have included various error handling for instances of failed API fetch retrievals. Also covered are cases where the user inputs a city that is not included in the working data set. 

<div align="center">
  <img src="public/imgs/error.png" alt="Image showing an error message when the city is not included in the data set." height="500">
</div>


## Future Iterations

Additionally included in the sidebar, are examples of several widgets that could be added to the project in the future, such as a user login component to personalize and store the search data, travel advisory alerts, and a foreign currency tracker. Currently, the user will be greeted with a "Coming Soon" notification when interacting with any of these planned enhancements. 

<div align="center">
  <img src="public/imgs/app_demo.webp" alt="Demo of the coming soon notification attached to the sidebar widgets" height="500">
</div>

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- CONTRIBUTING -->
## Contributing

This project has been a great opportunity to develop further familiarity with React and working with data from various APIs. It also provides a ton of flexibility and room to add and improve on this foundation, so if you want to make any contributions please feel free!

If you like the project, a star would be much appreciated! Thanks again!

For any additions please do the following: 

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/NewFeature`)
3. Commit your Changes (`git commit -m 'Add some NewFeature'`)
4. Push to the Branch (`git push origin feature/NewFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- CONTACT -->
## Contact

 <a href="https://www.linkedin.com/in/dinardavis/">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" data-canonical-src="https://img.shields.io/badge/LinkedIn-%230077B5.svg?logo=linkedin&amp;logoColor=white" style="max-width: 100%;">
  </a>
  <a href="https://twitter.com/dinardavis">
    <img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter" data-canonical-src="https://img.shields.io/badge/Twitter-%231DA1F2.svg?logo=Twitter&amp;logoColor=white" style="max-width: 100%;">
  </a>

Project Link: [https://github.com/dinardavis/travel_app](https://github.com/dinardavis/travel_app)

<p align="right">(<a href="#top">back to top</a>)</p>
