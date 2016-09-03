d3.json("/public/biobots_data.json", function(err, data) {
    if(error) throw error;

    var columns = [
        { head: 'Live Percent', cl: 'title',
          html: (row) => row.print_data.livePercent},
        { head: 'Dead Percent', cl: 'center',
          html: (row) => row.print_data.deadPercent},
        { head: 'Elasticity', cl: 'center',
          html: (row) => row.print_data.elasticity}
    ];

    // create table
    var table = d3.select('body')
        .append('table');

    // create table header
    table.append('thead').append('tr')
        .selectAll('th')
        .data(columns).enter()
        .append('th')
        .attr('class', (column) => column.cl)
        .text((column) => column.head);

    // create table body
    table.append('tbody')
        .selectAll('tr')
        .data(data.all_prints).enter()
        .append('tr')
        .selectAll('td')
        .data(function(row, i) {
            return columns.map((c) => {
                // compute cell values for this specific row
                var cell = {};
                d3.keys(c).forEach((k) => {
                    cell[k] = typeof c[k] == 'function' ? c[k](row) : c[k];
                });
                return cell;
            });
        }).enter()
        .append('td')
        .html((column) => column.html)
        .attr('class', (column) => column.cl);

})