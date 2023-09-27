 // Get the canvas element
 const ctx = document.getElementById('doughnutChart').getContext('2d');
    
 // Define data for the chart
 const data = {
     labels: ['Done', 'To do'],
     datasets: [{
         data: [11, 4], 
         backgroundColor: ['rgb(158, 192, 255)', '#008DFF'], 
     }]
 };

 // Configure the chart
 const options = {
     responsive: true,
     text: 'My Doughnut Chart',
     maintainAspectRatio: true,
 };

 // Create the doughnut chart
 const myDoughnutChart = new Chart(ctx, {
     type: 'doughnut',
     data: data,
     options: options
 });