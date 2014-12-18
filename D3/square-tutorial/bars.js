'use strict';
/*global d3*/

var sales = [
    { product: 'Hoodie',  count: 2, itemNumber: 1 },
    { product: 'Jacket',  count: 6, itemNumber: 2 },
    { product: 'Snuggie', count: 9, itemNumber: 3 }
];

var revised = [
    { product: 'Hoodie',  count: 8, itemNumber: 1 },
    { product: 'Scarf',   count: 5, itemNumber: 2 },
    { product: 'Snuggie', count: 9, itemNumber: 3 }
];

var svg = d3.select('svg');

var maxCount = d3.max(sales, function (d) {
    return d.count;
});

var x = d3.scale.linear()
    .range([0, 300])
    .domain([0, maxCount]);

var y = d3.scale.ordinal()
    .rangeRoundBands([0, 75])
    .domain(sales.map(function (d) {
        return d.itemNumber;
    }));

var rects = svg.selectAll('rect')
    .data(sales);

rects.enter()
    .append('rect')
    .attr('fill', 'steelBlue')
    .attr('x', x(0))
    .attr('y', function (d) {
        return y(d.itemNumber);
    })
    .attr('height', y.rangeBand())
    .attr('width', function (d) {
        return x(d.count);
    });

// update
rects = svg.selectAll('rect')
    .data(revised, function (d) {
        return d.product;
    });

// exit (remove jacket)
rects
    .exit()
    .transition()
    .duration(1000)
    .attr('width', 0)
    .remove();

// enter (append scarf in red)
rects.enter().append('rect')
    .attr('fill', 'red')
    .attr('x', x(0))
    .attr('y', function (d) {
        return y(d.itemNumber);
    });

// update count on Hoodie (from 2 to 8)
rects
    .transition()
    .duration(1000)
    .attr('height', y.rangeBand())
    .attr('width', function (d) {
        return x(d.count);
    });
