d3.custom = {};
 
d3.custom.bar = function module() {

	  var margin = {
        top: 100,
        right: 20,
        bottom: 50,
        left: 40
      },
      width = 600 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom,
      site='Yona',
      _index = 0;
		
		
	   
		
		var svg;
    
    	function exports(_selection) {
			_selection.each(function(data) {

			
			var x0 = d3.scale.ordinal()
			  .rangeRoundBands([0, width], .1);

			var x1 = d3.scale.ordinal();

			var y = d3.scale.linear()
			  .range([height, 0]);
			  
			function make_Y_axis() {
				return d3.svg.axis()
					.scale(y)
					.orient("left")
					.ticks(10);
			}

			var xAxis = d3.svg.axis()
			  .scale(x0)
			  .tickSize(0)
			  .orient("bottom");

			var yAxis = d3.svg.axis()
			  .scale(y)
			  .orient("left");

			var color = d3.scale.ordinal()
			  .range(["#ca0020", "#f4a582", "#92c5de"]);

			
			if (!svg) {
					 svg = d3.select(this).append('svg');
					 var container = svg.append('g').classed('container-group'+_index, true);

				}
				
			svg.attr("width", width + margin.left + margin.right)
						.attr("height", height + margin.top + margin.bottom);
			
			container.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
			
			
			
			var categoriesNames = data.map(function(d) {
			  return d.time;
			}); // the 5 time periods
			var trapNames = data[0].values.map(function(d) {
			  return d.trap;
			}); // the name of the traps
			console.log(trapNames);

			x0.domain(categoriesNames);
			x1.domain(trapNames).rangeRoundBands([0, x0.rangeBand()]);
			// y.domain([0, d3.max(data, function(category) {
// 			  return d3.max(category.values, function(d) {
// 				return d.specimen_count;
// 			  });
// 			})]);

			y.domain([0,70]);


			container.append("g")
			  .attr("class", "x axis")
			  .attr("transform", "translate(0," + height + ")")
			  .call(xAxis);

			 container.append("g")
					  .attr("class", "axis")
					  .attr("transform", "translate(100," + height + ")")
					  .append("text")
						  .attr("class", "label")
						  .style("fill","black")
						  .attr("x", 0)
						  .attr("y", 40)
						  .style("text-anchor", "end")
						  .style("font-size", 20)
						  .style("font-weight", 400)
						  .text(site);
			
			
			container.append("g")
			  .attr("class", "y axis")
			  .style('opacity', '0')
			  .call(yAxis)
			  .append("text")
			  .attr("transform", "rotate(-90)")
			  .attr("y", 6)
			  .attr("dy", ".71em")
			  .style("text-anchor", "end")
			  .style('font-weight', 'bold')
			  .text("Number specimens and species");

			container.select('.y').transition().duration(500).delay(1300).style('opacity', '1');

			container.append("g")
				.attr("class", "grid")
				.call(make_Y_axis()
					.tickSize(-width, 0, 0)
					.tickFormat(""));


			var slice = container.selectAll(".slice"+_index)
			  .data(data)
			  .enter().append("g")
			  .attr("class", "slice")
			  .attr("transform", function(d) {
				return "translate(" + x0(d.time) + ",0)";
			  });

			slice.selectAll("rect"+_index)
			  .data(function(d) {
				return d.values;
			  })
			  .enter().append("rect")
			  .attr("width", x1.rangeBand())
			  .attr("x", function(d) {
				return x1(d.trap);
			  })
			  .style("fill", function(d) {
				return color(d.trap)
			  })
			 //  .attr("y", function(d) {
// 				return y(0);
// 			  })
// 			  .attr("height", function(d) {
// 				return height - y(0);
// 			  })
// 			  
// 			  slice.selectAll("rect"+_index)
// 			  .transition()
// 			  .delay(function(d) {
// 				return Math.random() * 1000;
// 			  })
// 			  .duration(1000)
			  .attr("y", function(d) {
				return y(d.specimen_count);
			  })
			  .attr("height", function(d) {
				return height - y(d.specimen_count);
			  });
			  
			  
			  slice.selectAll('.dot'+_index).data(function(d) {
				return d.values;
			  })
			  .enter()
			  .append("circle")
			  .attr("class", "dot")
			  .attr("r", 5)
			  .attr("cx", function(d) {
				return x1(d.trap) + x1.rangeBand() / 2;
			  })
			  .attr("cy", function(d) {
				return y(d.species);
			  })
			  .attr("fill", "black")
			  .style("opacity",function(d){
			  	if(d.species != null){
			  		return 1;
			  	}else{
			  		return 0;
			  	}
			  });
			  
			  //Legend
		  var legend = svg.selectAll(".legend"+_index)
			  .data(data[0].values.map(function(d) { return d.trap; }).reverse())
		  	.enter().append("g")
			  .attr("class", "legend")
			  .attr("transform", function(d,i) { return "translate(0," + i * 20 + ")"; })
			  .style("opacity","0");

		  legend.append("rect")
			  .attr("x", 120)
			  .attr("y", 100)
			  .attr("width", 18)
			  .attr("height", 18)
			  .style("fill", function(d) { return color(d); });

		  legend.append("text")
			  .attr("x", 112)
			  .attr("y", 109)
			  .attr("dy", ".35em")
			  .style("text-anchor", "end")
			  .text(function(d) {return d; });

		  legend.transition().duration(500).delay(function(d,i){ return 1300 + 100 * i; }).style("opacity","1");


			})
			
			
			 
	
		}
		
		exports.site = function(value) {
			if (!arguments.length) return xValue;
			site = value;
			return this;
		}
		
	
		exports._index = function(value) {
			if (!arguments.length) return yValue;
			_index = value;
			return this;
		}
		
	
	
		return exports;

}