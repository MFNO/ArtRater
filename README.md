# Sagetap Frontend Coding Challenge
This is the technical portion of the Sagetap interview process for frontend candidates. 

How long it takes to complete is up to you! Please review this README, peruse the code, and estimate how long you think it will take / when you will be able to have it completed by. Then email/message us with your estimate, make a private fork of this repository, and get back to us when you're finished!

Please see the prompt below:

## Art Rater
### Overview

Within this repository you will find a React project that (sort of) allows a user to rate some pieces of art. 

There also exists one _extremely_ basic test in `App.test.tsx` that confirms the words "Art Rater" appear on the page.

### Part 1: Button Tests
Within `App.test.tsx` you will find four additional tests that have not yet been written, centered around the buttons for the rating functionality. 

Please follow the prompts in the test names and bodies to complete them, which will involve adding functionality to the page. While you are in the code you may find (many egregious) errors. You are encouraged to change anything you'd like!

### Part 2: Styling
This app doesn't look very good! For a quick fix, we suggest adding Material UI, Ant Design, or a similar library and making the artwork appear in rows of two items each. However, if you have a different opinion or want to get fancy, please do!

### Part 3: Adding & Removing Art
Please add two pieces of functionality:

1. A "Remove Art" button for each `ArtItem`, which will remove it from the page.
2. An "Add Art" form at the bottom of the page. It should consist of a textbox and a button. The textbox allows the user to enter in an `id` for a new piece of art. Clicking the button when the textbox is filled will create a new `ArtItem` on the page.

### Part 4: Data & Error States
You may notice that the user experience doesn't take into account any handling for when the API calls fail or take a long time to load. Please add some handling for this as well!