// Projects obeject
var projects = {
    "projects": [
        {
            "title": "Pitch Perfect",
            "description": "My very first iOS application. Developed with help from Udacity, the application allows the user to add simple audio effects to a recording of their own voice",
            "url": "https://github.com/matt-dobie/udacity-pitch-perfect",
            "image": "images/pitchperfect.jpg"
        },
        {
            "title": "Traffic Bugs",
            "description": "This game was developed with help from some free course material from Udacity, and demonstrates my ability to program Object-Oriented JavaScript",
            "url": "portfolio/trafficbugs.html",
            "image": "images/trafficbugs.jpg"
        },
        {
            "title": "Portfolio Website",
            "description": "This very page, mattdobie.com, is my first attempt at building a functional website. Its purpose is to to display my completed and future development projects",
            "url": "index.html",
            "image": "images/portfoliowebsite.jpg"
        },
        {
            "title": "Meme Generator",
            "description": "This project was also developed with help from Udacity, and allows the user to generate their own hilarious memes using any photo they choose",
            "url": "portfolio/memegenerator.html",
            "image": "images/memegenerator.jpg"
        },
        {
            "title": "Falcon Assault",
            "description": "A simple game developed in Scratch, where the goal is to pilot the Millennium Falcon and survive as long as you can against incoming waves of enemy TIE fighters!",
            "url": "https://scratch.mit.edu/projects/106309939/",
            "image": "images/falconassualt.jpg"
        },
        {
            "title": "Coming Soon",
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer semper, velit eget porta malesuada, justo magna condimentum nibh, at dapibus massa enim varius nisl",
            "url": "#",
            "image": "http://placehold.it/400x250"
        }
    ]
};


// Display featured projects (ie. first 3 projects)
projects.displayFeatured = function() {
    $("#featured").append(HTMLRow);

    if (projects.projects.length > 0) {
        for (var i = 0; i < 3; i++) {
        
            $(".row:last").append(HTMLprojectStart);

            var formattedImage = HTMLprojectImageSrc.replace("%data%", projects.projects[i].image) + HTMLprojectImageAlt.replace("%data%", projects.projects[i].title);
            $(".project:last").append(formattedImage);

            var formattedTitle = HTMLprojectTitle.replace("%data%", projects.projects[i].title);
            $(".project:last").append(formattedTitle);

            var formattedDescription = HTMLprojectDescription.replace("%data%", projects.projects[i].description);
            $(".project:last").append(formattedDescription);

            var formattedUrl = HTMLprojectUrl.replace("%data%", projects.projects[i].url);
            $(".project:last").append(formattedUrl);
        }
    }
}

// Display all projects
projects.displayAll = function() {
    
    var projectCounter = 1;
    var projectNumber = projects.projects.length;

    if (projectNumber > 0) {
        for (var i = 0; i < projectNumber; i++) {
            if (projectCounter === 1) {
                    $("#portfolio").append(HTMLRow);
            }
            
            $(".row:last").append(HTMLprojectStart);

            var formattedImage = HTMLprojectImageSrc.replace("%data%", projects.projects[i].image) + HTMLprojectImageAlt.replace("%data%", projects.projects[i].title);
            $(".project:last").append(formattedImage);

            var formattedTitle = HTMLprojectTitle.replace("%data%", projects.projects[i].title);
            $(".project:last").append(formattedTitle);

            var formattedDescription = HTMLprojectDescription.replace("%data%", projects.projects[i].description);
            $(".project:last").append(formattedDescription);

            var formattedUrl = HTMLprojectUrl.replace("%data%", projects.projects[i].url);
            $(".project:last").append(formattedUrl);
            
            projectCounter++;

            if (projectCounter > 3) {
                    projectCounter = 1;
            }
        }
    }
}