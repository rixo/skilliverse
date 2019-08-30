# Skilliverse

The goal of this app is to map out a team's skills so you can see where you can improve at the group level.

This is a demo app built in Svelte mostly to practice my programming skills.

## New ideas

* Add support for mobile with named CSS grid areas  
* In 4 tabs steken voor mobile view
* You need to have controls about who you want to visualize on the chart

## WIP

* Component +- stepper verticaal laten renderen
    * Work on implementing the window resizing in a better manner so it dynamic

## Todo

* Add a meta description to the website - maybe with opengraph tags?
* Make the labels of the chart darker
* Use vh/vw unit on the radius of the chart for small screen to maximize chart display on smaller screens
* Make an empty data set for testing purposes
* Validate the input in a better way. If invalid input is entered, set it to the max or min valid input depending on whether it is a negative number of positive number.
    * Need to redo those input styles
* Implement random id on labels that matches inputs in form groups

        function makeid(length) {
            var result           = '';
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }

        let labelId = 'a'+makeid(6);

## Ideas done

* Provide a color picker so the user can choose their own chart colors
* test the InputColorAlt component on iPad
