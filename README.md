###gh-star
Data visualization for Top 100 Github repositories in treemap style.
Live website can be view at [here](http://ghtop-ghstar.rhcloud.com)

###Why I created this
A more interesting way to display github top repositories popularity. 
This can help you to get know popularity library/frameworks in the language you are working with.
For instance, a new Javascript developer might know [angular.js](https://angularjs.org/) or [nodejs](http://nodejs.org/) due to big community and resources.
But JavaScript can do more. Library like [impress.js](http://bartaz.github.io/impress.js/#/bored) or [skrollr](http://prinzhorn.github.io/skrollr/) are libraries that will make you get excited too. 
You might find something new that you never know through *gh-star*.

###Built with
 * nodejs(express) + mongodb(mongoskin) for backend
 * [Github Api](https://developer.github.com/v3://developer.github.com/v3/)
 * [React](http://facebook.github.io/react/) + [D3](http://d3js.org/) for frontend
 * Helpful npm modules - [superagent](https://github.com/visionmedia/superagent), [async](https://github.com/caolan/async) 
 * Hosted by [OPENSHIFT](http://www.openshift.org/)

###To do
 * UI Redesign
 * Code refactoring
 * Adding more information to the visualization(tooltips etc)
 * Zoomable treemap
 * Complete Test
