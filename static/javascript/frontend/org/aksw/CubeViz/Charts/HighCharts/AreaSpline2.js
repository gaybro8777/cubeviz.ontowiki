Namespacedotjs('org.aksw.CubeViz.Charts.HighCharts.AreaSpline2', {
	
	aDimension: {},
	bDimension: {},
    
    /**
     * Standard configuration object for a chart
     */
    config: {
        chart: {
            renderTo: 'container',
            type: 'areaspline'
        },
        title: {
            text: ''
        },
        xAxis: {
            categories: []
        },
        plotOptions: {
            series: {
                groupPadding: 0.2
            },
            areaspline: {
                fillOpacity: 0.5
            }
        },
        series: []
    },
    
    /**
     * Initialize the chart object
     * @param resultObservations
     * @param componentParameter
     */
    init: function (observations, parameters, nDimensions) {
        
        // Include org.aksw.CubeViz.Charts.HighCharts.Chart
        Namespacedotjs.include ('org.aksw.CubeViz.Charts.HighCharts.Chart2');
        var chart = org.aksw.CubeViz.Charts.HighCharts.Chart2;
        this.config.title.text = chart.getTitle ( observations, parameters, nDimensions ); 
        
        this.aDimension = chart.initDimension(observations, parameters, nDimensions[0]);
        this.bDimension = chart.initDimension(observations, parameters, nDimensions[1]);
        
        this.aDimension.series = chart.getSeries(this.aDimension, this.bDimension);
        this.bDimension.series = chart.getSeries(this.bDimension, this.aDimension);
        
        if(this.bDimension.overallLabelLength > this.aDimension.overallLabelLength) {
			this.config.xAxis.categories = this.bDimension.categories;
			this.config.series = this.bDimension.series;
		} else {
			this.config.xAxis.categories = this.aDimension.categories;
			this.config.series = this.aDimension.series;
		}
        
    },
    
    /**
     * Calling different function to compute an object which represents a barchart
     */
    getRenderResult: function () {
        return this.config;
    }
});