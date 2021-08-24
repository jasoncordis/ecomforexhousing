# E-Haus

SF Hacks Devpost Submission - https://devpost.com/software/get-me-a-house

## Inspiration
We were inspired by one of our members, Gaurav, who told us how his experience as an exchange student made him think of a website that would connect students with good housing in the places where they study.

## What it does
Students are asked to create a profile in order to find matches that are specific their city of choice and housing needs. When the student finishes registering, they can view matches in their city on a Google Map and find more information about the house and homeowner. We use Echo AR technology to give you a new way of trying out your new home. Pick up your phone, scan the QR code, and ta da! Just like that you're testing out your living space without even getting on the plane!

## How we built it
The website is built using Flask. Using Google Places API, the user can enter the location. Then, the coordinates are passed over to the main page, which will show available matches for the student on markers. In order to store our data, we used Cloud SQL on Google Cloud to create a PostgreSQL database that stores information about listings, including price, coordinates, and image URLs.

## Challenges we ran into
To finish the project, we had to coordinate with members in different time zones so that we could work on each part of the project. In order to get the Google APIs to work, we shared our screens via Discord so we could discuss how to best implement these features and test them. We also had quite a bit of trouble getting the front end code to work as we liked. We ran into many rendering issues and it was very challenging to structure our code to match the great design.

## Accomplishments that we're proud of
Given the time constraints, and the range in time zones, we did a phenomenal job getting this project far. It was most of our first time doing a hackathon which added another layer of difficulty but we were able to use our passion for creating this web app to push through all of those struggles. We set a really large north star from the beginning, which was good and kept us moving forward, but we were able to quickly pivot when we realized we were getting low on time. Ultimately, working together has given us all the opportunity to learn about new subjects within the tech worlds - some in design, some in coding - and it'll be great to keep building on these skills in the rest of our careers.

## What we learned
This was our first time using Google Cloud, which provided valuable experience managing online database. We were working with a mix of skill sets, so we were able to pick on different things from each other. Some of the key things we learned were about UI Kits from a design perspective, Echo AR, time-management and how to work well as a team under pressure.
