$(document).ready(function() {
    // Functionality to toggle column visibility
    $('input[type="checkbox"]').change(function() {
        var column = $(this).attr('data-column');
        $('td:nth-child(' + column + '),th:nth-child(' + column + ')').toggle();
    });
    
    // Functionality to add custom columns
    $('#add-column-form').submit(function(event) {
        event.preventDefault();
        var columnName = $('#column-name').val();
        
        // Update table header
        var header = $('#user-table thead tr');
        header.append('<th>' + columnName + '</th>');
        
        // Update table body for existing rows
        $('#table-body tr').each(function() {
            $(this).append('<td></td>'); // Adjust as per data availability
        });
    });
    
    // Function to fetch data from PHP backend
    function fetchData() {
        $.ajax({
            url: 'fetch_data.php',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                populateTable(data);
            },
            error: function(xhr, status, error) {
                console.error('Error fetching data:', error);
            }
        });
    }

    



    // Mock data for demonstration (replace with actual data fetch)
    var mockData = [
        { name: 'John Doe', nickname: 'JD', mobile: '1234567890', email: 'john@example.com', role: 'Admin', address: '123 Main St', gender: 'Male', profilePic: 'avatar1.jpg' },
        { name: 'Jane Smith', nickname: 'JaneS', mobile: '9876543210', email: 'jane@example.com', role: 'User', address: '456 Elm St', gender: 'Female', profilePic: 'avatar2.jpg' }
        // Add more mock data entries as needed
    ];
    
    // Function to populate table with data
    function populateTable(data) {
        $('#table-body').empty(); // Clear existing rows
        
        data.forEach(function(user) {
            var row = '<tr>';
            row += '<td>' + user.name + '</td>';
            row += '<td>' + user.nickname + '</td>';
            row += '<td>' + user.mobile + '</td>';
            row += '<td>' + user.email + '</td>';
            row += '<td>' + user.role + '</td>';
            row += '<td>' + user.address + '</td>';
            row += '<td>' + user.gender + '</td>';
            row += '<td><img src="' + user.profile_pic + '" alt="Profile Picture" style="max-width: 50px;"></td>';
            row += '</tr>';
            $('#table-body').append(row);
        });
        
        // Initial hide/show based on default checkboxes
        $('input[type="checkbox"]').each(function() {
            var column = $(this).attr('data-column');
            if (!$(this).prop('checked')) {
                $('td:nth-child(' + column + '),th:nth-child(' + column + ')').hide();
            }
        });
    }
    
    // Call function to fetch initial data
    fetchData();
});
