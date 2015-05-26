# DeployR MSML Demo

## Prerequisites

- Install the latest stable version of [Node.js](http://nodejs.org/) (version 0.10.x).

## Quick start

0. Install [Node.js](http://nodejs.org/) 
1. ```$ git clone https://github.com/deployr/msml-demo.git```
2. ```$ cd msml-demo```
3. ```$ npm install```
4. ```$ npm run serve```
5. Open `msml-demo/ui/ui.html` in your editor and begin editing Web Components and [experimenting](#experimenting)
6. View changes in [http://localhost:3000/#/](http://localhost:3000/#/)

## Installation

#### Github

```
$ git clone https://github.com/deployr/msml-demo.git
```

#### Without Github

Alternatively you can just download and explode the [repository zip bundle](https://github.com/deployr/msml-demo/archive/master.zip).


Installation is managed via [npm](http://npmjs.org), the [Node.js](http://nodejs.org/) package manager.

One-line install using [npm](http://npmjs.org):

```
$ cd msml-demo
$ npm install
```

## Run

```
$ cd msml-demo
$ npm run serve
```

This will start a local webserver and launch your browser pointing to [http://localhost:3000](http://localhost:3000/#/)

## Experimenting

The `ui` directory contains files that you can *edit*.

- ui.html

   Defines where you add your [HTML5 Web Components](#supported-ui-elements) to 
   build out the user interface. This is where the bulk of your work will take place.

- ui.css

   Defines the location to put any custom styles if needed.

- ui.js

   Defines the location to put any custom JavaScript if needed. Any function or
   property added to the object literal will be two-way data bound to the UI and
   referenced using the `{{}}` expression in your ui.html file.

Examples:


_ui.js_
```js
var ui {	
  hello: 'Hello how are you?'

  echo: function(msg) {
  	return msg;
  }
};
```

_ui.html_

```html
  <h1>{{ hello }}</h1> 

  <h1>{{ echo('R and JavaScript') }}</h1> 
```

## Supported UI elements

DeployR web component elements are a set of visual and non-visual utility 
elements. They include elements for working with user input, selection, and
for declarative binding DeployR enabled R Scripts to the UI.

Please __NOTE__ this list is a subset of all our elements. They have been slimmed down 
for the purpose of the demonstration.


### deployr-server

The `deployr-server` element is used to wire the DeployR server and UI up. It
sets up an I/O abstraction between DeployR and the UI well as manages basic 
authentication and R Session orchestration.

```html
<deployr-server></deployr-server>
```

Example:

```html
<deployr-server endpoint="http://dhost:7400" cors="true"></deployr-server>

```

### deployr-rscript

The `deployr-rscript` element is used to bind DeployR enabled R Scripts to the UI.

```html
<deployr-rscript></deployr-rscript>
```

Example:

```html
<deployr-rscript 
   name="uspop" 
   author="swells" 
   directory="geo" 
   inputs="nclust" 
   outputs="RRevoRUGS_2014,aggdata"
   runOnload="true">
</deployr-rscript>

<deployr-rscript 
   name="faithful" 
   author="swells" 
   directory="faithful" 
   inputs="n_breaks,individual_obs,density,bw_adjust" 
   outputs="plot"
   runOnload="true">
</deployr-rscript>    
```

### deployr-dropdown-menu

The `deployr-dropdown-menu` element is used as a select list to bind a UI value
from the list to a DeployR R Script _input_.

```html
<deployr-dropdown-menu></deployr-dropdown-menu>
```

Example:
```html
<deployr-dropdown-menu 
   rscript="uspop" 
   rinput="nclus" 
   rtype="numeric" 
   watch="true"
   label="K-Means Cluster Analysis"
   selected="1"
   items='{ "labels": [1, 2, 3, 4, 5], "values": [1, 2, 3, 4, 5] }' >
</deployr-dropdown-menu>

<deployr-dropdown-menu 
   rscript="faithful" 
   rinput="n_breaks" 
   rtype="numeric" 
   watch="true"
   label="Number of bins in histogram"
   selected="20"
   items='{ "labels": [10, 20, 35, 50], "values": [10, 20, 35, 50] }' >
</deployr-dropdown-menu>     
```  

### deployr-checkbox

The `deployr-checkbox` is a button that can be either checked or unchecked. The
element is used to bind a UI value from the checkbox state to a DeployR R Script 
_input_.

```html
<deployr-checkbox></deployr-checkbox>
```

Exmaple:
```html
<deployr-checkbox 
   rscript="faithful" 
   rinput="individual_obs" 
   rtype="logical" 
   watch="true" 
   label="Show individual observations">
</deployr-checkbox>         
               
<deployr-checkbox         
   rscript="faithful" 
   rinput="density" 
   rtype="logical" 
   watch="true" 
   label="Show density estimate">
</deployr-checkbox>                    
```

### deployr-slider

The `deployr-slider` allows a user to select a value from a range of values by 
moving the slider thumb. The element is used to bind a UI value from the slider 
state to a DeployR R Script _input_.

```html
<deployr-slider></deployr-slider>
```

Example:

```html     
<deployr-slider
  rscript="faithful" 
  rinput="bw_adjust" 
  rtype="numeric" 
  watch="true" 
  width="400px"
  min="0" 
  max="2" 
  value="1"
  step="0.2"
  pin="true"
  snaps="false">
</deployr-slider>
```

### deployr-leaflet-tilelayer

The `deployr-leaflet-tilelayer` is used in conjunction with [leaflet-map](https://github.com/nhnb/leaflet-map)
for displaying interactive [Leaflet](http://leafletjs.com/) maps. The element is 
used to bind a DeployR R Script _output_ encoded in geoJSON to the UI. 

```html
<leaflet-map>
   <deployr-leaflet-tilelayer></deployr-leaflet-tilelayer>
</leaflet-map>
```

Example:
```html
<leaflet-map longitude="-96.6" latitude="39.5" zoom="3">
   <deployr-leaflet-tilelayer 
      rscript="uspop"
      routput="RRevoRUGS_2014"
      fitBounds="false"
      pointToLayer="{{pointToLayerHandler}}"
      onEachFeature="{{onEachFeatureHandler}}">            
   </deployr-leaflet-tilelayer>       
</leaflet-map>
``` 

### deployr-plot

The `deployr-plot` is an element for displaying an R plot. The element is used 
to bind a DeployR R Script _output_ plot to the UI. It provides useful sizing 
and preloading options for displaying purposes.

```html
<deployr-plot></deployr-plot>
```

Example:
```html
<deployr-plot 
   rscript="faithful" 
   routput="plot"
   width="400"
   height="400">
</deployr-plot>
```


## R Scripts used

### uspop.R

```R
# population data from http://factfinder.census.gov/faces/tableservices/jsf/pages/productview.xhtml?src=bkmk

url<-"http://166.78.105.110:7400/apps/csv/rug2014us.csv"
rug<-read.csv(url, stringsAsFactors=F)

#drop out ID column
rug<-rug[,2:13]

#create clusters based on group size plus population estimates
mydata <- scale(rug[6:12])

# K-Means Cluster Analysis
fit <- kmeans(mydata, nclus) 

# get cluster means 
aggdata <- aggregate(mydata,by=list(fit$cluster),FUN=mean)

# append cluster assignment
rug <- cbind(rug, cluster=fit$cluster)

revoPackage("leafletR")  #plot leaflet
dat_geo <- toGeoJSON(data=rug, name="RRevoRUGS_2014")
```

#### Inputs

- nclus _numeric_

#### Outputs

- geoJSON file
- aggdata _data.frame_


### faithful.R

```R
hist(faithful$eruptions,
     probability = TRUE,
     breaks = as.numeric(n_breaks),
     xlab = "Duration (minutes)",
     main = "Geyser eruption duration")

if (individual_obs) {
  rug(faithful$eruptions)
}

if (density) {
  dens <- density(faithful$eruptions,
                  adjust = bw_adjust)
  lines(dens, col = "blue")
}
```

#### Inputs

- n_breaks _numeric_
- individual_obs _logical_
- density _logical_
- bw_adjust _numeric_

#### Outputs

- Plot
