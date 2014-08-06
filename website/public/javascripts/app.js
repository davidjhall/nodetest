$(function () {
for (var i =0 ; i < 5; i++)
{
console.log(i);
}

        $('#container').highcharts({
            title: {
                text: 'Users',
                x: -20 //center
            },
            subtitle: {
                text: 'userstest.users',
                x: -20
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            yAxis: {
                title: {
                    text: '# of users'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: 'Date'
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: [{
                name: 'http://104.131.232.17/',
                data: [9,21,0,0,0,0,5,7]
            }]
        });
    });

