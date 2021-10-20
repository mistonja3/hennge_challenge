# Project Overview
The whole project was built using JavaScript with jQuery and Bootstrap. Libraries were needed for the function of the date range picker.

Email table design is very simple but when it came to finding dates withing certain date range it took me some time to figure out how to work it out.
I basically hard coded the dates and it won't work for dates before 2019 and dates for 2020. I hard coded emails for 2019 and for current year 2021.
When there is only a month name in the date column we assume it is from current year, 2021 and if there is only time in the date column we assume it is from today. I didn't hard code
other years. So this email archiver currently works for the dates that we already have in the table (Todays date, January for current year 2021, and 2019).

I created a search filter where we can search any email containing the word we put in our input field. Once we type some word and click the search button, the code will look for the word inside
of 3 columns of each row and check if it contains the entered word. If it finds the containing word it will display all the emails containing it.

For sorting table by ascending and descending order I used a useful piece of code from w3schools, but I had to change it a bit for the date column because the code does not sort dates but letters and number only.

For table body I created another table row with width of 4 colspan and made it hidden until we click on certain email. Table body was put in a div with unordered list where it stores reciever, recipient, subject, date and text of the email.

