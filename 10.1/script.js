console.log('10.1');

var m = {t:50,r:50,b:50,l:50},
    w = document.getElementById('canvas').clientWidth - m.l - m.r,
    h = document.getElementById('canvas').clientHeight - m.t - m.b;

var plot = d3.select('.canvas')
    .append('svg')
    .attr('width', w + m.l + m.r)
    .attr('height', h + m.t + m.b)
    .append('g').attr('class','plot')
    .attr('transform','translate('+ m.l+','+ m.t+')');

var projection = d3.geoMercator()
    .scale(100)
    .translate([w / 2, h / 2]);

    var path = d3.geoPath()
    .projection(projection);

    d3.json('../data/world-50m.json',dataloaded);

    color = d3.scaleLinear().domain([1,1000])
    .interpolate(d3.interpolateHcl)
    .range([d3.rgb("#00264d"), d3.rgb('#ffffff')]);



function dataloaded(err, data) {
    var countries = topojson.feature(data, data.objects.countries).features;


    plot
    .selectAll(".country")
        .data(countries)
        .enter()
        .insert("path", ".graticule")
        .attr("class", "country")
        .attr("d", path)
        .style("fill",function(d){

        //  console.log(d.id);
        return color(d.id)

        });
}



