# Skilliverse

The goal of this app is to map out a team's skills so you can see where you can improve at the group level.

This is a demo app built in Svelte mostly to practice my programming skills.

## New ideas

* Add support for mobile with named CSS grid areas
* Put the layout in 4 tabs for mobile
* You need to have controls about who you want to visualize on the chart

## Todo

* Refactor skillitem to a general stepper component
* Continue work on the grid item logic
* Add a meta description to the website - maybe with opengraph tags?
* Make an empty data set for testing purposes
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

* Provide a color picker so the user can choose their own chart colors
* test the InputColorAlt component on iPad
