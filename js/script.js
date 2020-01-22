$(document).ready(function () {
    $('#holder').hide();
    $("#get-employees").fadeIn();
    $('#get-employees').click(function () {
        $(this).fadeOut();
        $('#loader').fadeIn(function () {
            $.ajax({
                url: "https://www.mccinfo.net/epsample/employees"
            }).done(onAjaxComplete);
        });
    });

    //var data;
    function onAjaxComplete(data) {

        var emp = $.parseJSON(data);

        var s = "";

        for (var i = 0; i < emp.length; i++) {
            s += '<h3>' + emp[i].first_name + " " + emp[i].last_name + '</h3>';
            s += "<div id='" + emp[i].id + "'>";
            s += "<p> First Name:" + emp[i].first_name + "<br> " + "<br> " + "Last Name:" + emp[i].last_name + "</p>";
            s += "<p> Image: </p>";
            s += "<img src= '" + emp[i].image_filename + "' alt='img' />";
            s += "<br><br>"
            s += "<button id='"+ emp[i].id +"'"+ 'class="get-info">Get Info</button>';
            s += "</div>";

            /*if (i != (emp.length-1)){
             s +="<hr/>";
                }*/
            $("#holder").html(s);
            $("#loader").fadeOut(function () {
                $('#holder').accordion({
                    heightStyle: 'content'
                });
                $('#holder').fadeIn();


            });

            $('.get-info').click(function(evt) {
                
              console.log(this.id);  
              //evt.stopImmediatePropagation();
                $.ajax({
                    url: "https://www.mccinfo.net/epsample/employees/"+this.id
                }).done(showEmployeeInfo);
            });

        }

    }

    function showEmployeeInfo(data) {

        var emp= $.parseJSON(data);
            console.log(emp);
        var name = emp.first_name + " " + emp.last_name;
        var salary = accounting.formatMoney(emp.annual_salary);
        $("#dialog").attr("title", name);
    
         var s = " ";
            s += "<p>Image:<p>";
            s += "<img src='" + emp.image_filename + " ' alt='Image'/>";
             s += "<p> Hire Date:" + emp.hire_date + "</p>";
         s += "<p> Salary:" + salary + "</p>";
         s += "<p> Department:" + emp.department.name + "</p>";
         $('#dialog').html(s);
         $("#dialog").dialog();


    }


});
