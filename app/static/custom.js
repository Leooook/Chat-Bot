// ------------------------------------ custom.js ------------------------------------


// ####################### Small function part #######################

$("#register").click(function() {
	const element =  document.querySelector('.main-part');
    element.classList.add('animated', 'shake');
})

$("#login").click(function() {
	const element =  document.querySelector('.main-part');
    element.classList.add('animated', 'shake');
})

// add some animated for heading
$("#my_heading").mouseover(function() {
	const element =  document.querySelector('.my-heading');
    element.classList.add('animated', 'swing');
})
$("#my_heading").mouseout(function() {
	const element =  document.querySelector('.my-heading');
    element.classList.remove('animated', 'swing');
})

// Recent Questions 
function get_recent_questions() {
    document.getElementById("na").style.display="none";
    const element =  document.querySelector('.qa');
    element.classList.add('animated', 'fadeIn');
    const element1 =  document.querySelector('#na');
    element1.classList.add('animated', 'fadeIn');
    
    const daer = Server.docontent;
    const id = daer[0];
    
    var data = {"id":id};
    
    $.ajax({
    url: "/questions",
    method: "POST",
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    processData: false,
    // When success 
    success: 
        function (infos) {
            console.log(infos);
            
            if(infos == 404) {
                document.getElementById("na").style.display="";
            }
            else { 
                $('#cc1').text(infos["c1"]);
                $('#q11').text("Q:" + " " + infos["question11"]);
                $('#a11').text("A:" + " " + infos["answer11"]);
                $('#q12').text("Q: " + " " + infos["question12"]);
                $('#a12').text("A:" + " " + infos["answer12"]);
                $('#q13').text("Q: " + " " + infos["question13"]);
                $('#a13').text("A:" + " " + infos["answer13"]);
                $('#cc2').text(infos["c2"]);
                $('#q21').text("Q:" + " " + infos["question21"]);
                $('#a21').text("A:" + " " + infos["answer21"]);
                $('#q22').text("Q: " + " " + infos["question22"]);
                $('#a22').text("A:" + " " + infos["answer22"]);
                $('#q23').text("Q: " + " " + infos["question23"]);
                $('#a23').text("A:" + " " + infos["answer23"]);  
                $('#cc3').text(infos["c3"]);
                $('#q31').text("Q:" + " " + infos["question31"]);
                $('#a31').text("A:" + " " + infos["answer31"]);
                $('#q32').text("Q: " + " " + infos["question32"]);
                $('#a32').text("A:" + " " + infos["answer32"]);
                $('#q33').text("Q: " + " " + infos["question33"]);
                $('#a33').text("A:" + " " + infos["answer33"]); 
            }
        }
    });    
}

// Question satistics (Teacher)
function question_satistics() {
    document.getElementById("na").style.display="none";
    const element =  document.querySelector('.qa');
    element.classList.add('animated', 'fadeIn');
    const element1 =  document.querySelector('#na');
    element1.classList.add('animated', 'fadeIn');
    
    const daer = Server.docontent;
    const id = daer[0];
    
    var data = {"id":id};
    
    $.ajax({
    url: "/satistics",
    method: "POST",
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    processData: false,
    // When success 
    success: 
        function (infos) {
            console.log(infos);
            
            if(infos == 404) {
                document.getElementById("na").style.display="";
            }
            else { 
                $('#cc1').text(infos["c1"]);
                $('#q11').text(infos["q1"] + " questions answered");
                $('#a11').text(infos["qq1"] + " questions not answered");
                $('#s11').text("Progress: " + infos["s1"] + "%");
                $('#cc2').text(infos["c2"]);
                $('#q21').text(infos["q2"] + " questions answered");
                $('#a21').text(infos["qq2"] + " questions not answered");
                $('#s21').text("Progress: " + infos["s2"] + "%");
                $('#cc3').text(infos["c3"]);
                $('#q31').text(infos["q3"] + " questions answered");
                $('#a31').text(infos["qq3"] + " questions not answered");
                $('#s31').text("Progress: " + infos["s3"] + "%");
            }
        }
    });    
}


// User Detail
function user_detail() {
    const page = document.querySelector('#user_detail');
    page.classList.add('animated', 'bounceInDown');
    document.getElementById("recent_question").style.display="none";
    document.getElementById("my_class").style.display="none";
    document.getElementById("edit_profile").style.display="none";
    document.getElementById("about_us").style.display="none";
    document.getElementById("user_detail").style.display="";
    
    document.getElementById("new_email").style.display="none";
    document.getElementById("new_passwd").style.display="none";
    document.getElementById("new_name").style.display="none";
    document.getElementById("success").style.display="none";
    
    document.getElementById("success").style.display="none";
	const elements =  document.querySelector('#success');
    elements.classList.remove('animated', 'fadeOut');
    
    $('#cl1').val('');
    $('#cl2').val('');
    $('#cl3').val('');
    $('#course_error').text('');
    
    $('#name_error').text('');
    $('#email_error').text('');
    $('#passwd_error_1').text('');
    $('#passwd_error_2').text('');
    
    $('#input_name').val('');
    $('#input_email').val('');
    $('#input_old_passwd').val('');
    $('#input_new_passwd').val('');
    
    const daer = Server.docontent;
    const id = daer[0];
    
    const element =  document.querySelector('.info');
    element.classList.add('animated', 'fadeIn');
    
    var data = {"id":id};
    
    $.ajax({
    url: "/info",
    method: "POST",
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    processData: false,
    // When success 
    success: 
        function (infos) {
            console.log(infos);
            
            var name = 'Name:  ' + infos["name"];
            var zid = 'Zid:  ' + id;
            var email = 'Email:  ' + infos["email"];
            var type = 'Type:  Student'
            
            $('#show_name').text(name);
            $('#show_zid').text(zid);
            $('#show_email').text(email);
            $('#show_type').text(type);
        }
    });     
}

// User Detail teacher
function user_detail_t() {
    const page = document.querySelector('#user_detail');
    page.classList.add('animated', 'bounceInDown');
    document.getElementById("recent_question").style.display="none";
    document.getElementById("my_class").style.display="none";
    document.getElementById("edit_profile").style.display="none";
    document.getElementById("about_us").style.display="none";
    document.getElementById("user_detail").style.display="";
    
    document.getElementById("new_email").style.display="none";
    document.getElementById("new_passwd").style.display="none";
    document.getElementById("new_name").style.display="none";
    document.getElementById("success").style.display="none";
    
    document.getElementById("success").style.display="none";
	const elements =  document.querySelector('#success');
    elements.classList.remove('animated', 'fadeOut');
    
    $('#cl1').val('');
    $('#cl2').val('');
    $('#cl3').val('');
    $('#course_error').text('');
    
    $('#name_error').text('');
    $('#email_error').text('');
    $('#passwd_error_1').text('');
    $('#passwd_error_2').text('');
    
    $('#input_name').val('');
    $('#input_email').val('');
    $('#input_old_passwd').val('');
    $('#input_new_passwd').val('');
    
    const daer = Server.docontent;
    const id = daer[0];
    
    const element =  document.querySelector('.info');
    element.classList.add('animated', 'fadeIn');
    
    var data = {"id":id};
    
    $.ajax({
    url: "/info_t",
    method: "POST",
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    processData: false,
    // When success 
    success: 
        function (infos) {
            console.log(infos);
            
            var name = 'Name:  ' + infos["name"];
            var zid = 'Zid:  ' + id;
            var email = 'Email:  ' + infos["email"];
            var type = 'Type:  Staff'
            
            $('#show_name').text(name);
            $('#show_zid').text(zid);
            $('#show_email').text(email);
            $('#show_type').text(type);
        }
    });     
}

// return1 返回1
function return1() {
    const page = document.querySelector('#recent_question');
    page.classList.add('animated', 'bounceInUp');
    
    document.getElementById("user_detail").style.display="none";
    document.getElementById("recent_question").style.display="";
}


// my classes student
function my_classes() {
    const page = document.querySelector('#my_class');
    page.classList.add('animated', 'bounceInDown');
    
    document.getElementById("recent_question").style.display="none";
    document.getElementById("user_detail").style.display="none";
    document.getElementById("about_us").style.display="none";
    document.getElementById("edit_profile").style.display="none";
    document.getElementById("my_class").style.display="";
    
    document.getElementById("new_email").style.display="none";
    document.getElementById("new_passwd").style.display="none";
    document.getElementById("new_name").style.display="none";
    document.getElementById("success").style.display="none";
    
    document.getElementById("first_classes").style.display="none";
	const elements =  document.querySelector('#success');
    elements.classList.remove('animated', 'fadeOut');
    
    $('#name_error').text('');
    $('#email_error').text('');
    $('#passwd_error_1').text('');
    $('#passwd_error_2').text('');
    
    $('#input_name').val('');
    $('#input_email').val('');
    $('#input_old_passwd').val('');
    $('#input_new_passwd').val('');
    
    const daer = Server.docontent;
    const id = daer[0];
    
    var data = {"id":id};
    
    $.ajax({
    url: "/classes",
    method: "POST",
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    processData: false,
    // When success 
    success: 
        function (infos) {
            console.log(infos);
            
            if(infos == 404) {
                const element =  document.querySelector('#first_classes');
                element.classList.add('animated', 'fadeIn');
                document.getElementById("first_classes").style.display="";
            }
            else {
                const element =  document.querySelector('#already_classes');
                element.classList.add('animated', 'fadeIn');
                document.getElementById("my_c").style.display="";
                document.getElementById("already_classes").style.display="";
                
                var c1 = 'Course1:  ' + infos["c0"];
                var c2 = 'Course2:  ' + infos["c1"];
                var c3 = 'Course3:  ' + infos["c2"];
            
                $('#c1').text(c1);
                $('#c2').text(c2);
                $('#c3').text(c3);              
            }           
        }
    });    
}

// my classes teacher
function my_classes_t() {
    const page = document.querySelector('#my_class');
    page.classList.add('animated', 'bounceInDown');
    
    document.getElementById("recent_question").style.display="none";
    document.getElementById("user_detail").style.display="none";
    document.getElementById("about_us").style.display="none";
    document.getElementById("edit_profile").style.display="none";
    document.getElementById("my_class").style.display="";
    
    document.getElementById("new_email").style.display="none";
    document.getElementById("new_passwd").style.display="none";
    document.getElementById("new_name").style.display="none";
    document.getElementById("success").style.display="none";
    
    document.getElementById("first_classes").style.display="none";
	const elements =  document.querySelector('#success');
    elements.classList.remove('animated', 'fadeOut');
    
    $('#name_error').text('');
    $('#email_error').text('');
    $('#passwd_error_1').text('');
    $('#passwd_error_2').text('');
    
    $('#input_name').val('');
    $('#input_email').val('');
    $('#input_old_passwd').val('');
    $('#input_new_passwd').val('');
    
    const daer = Server.docontent;
    const id = daer[0];
    
    var data = {"id":id};
    
    $.ajax({
    url: "/classes_t",
    method: "POST",
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    processData: false,
    // When success 
    success: 
        function (infos) {
            console.log(infos);
            
            if(infos == 404) {
                const element =  document.querySelector('#first_classes');
                element.classList.add('animated', 'fadeIn');
                document.getElementById("first_classes").style.display="";
            }
            else {
                const element =  document.querySelector('#already_classes');
                element.classList.add('animated', 'fadeIn');
                document.getElementById("my_c").style.display="";
                document.getElementById("already_classes").style.display="";
                
                var c1 = 'Course1:  ' + infos["c0"];
                var c2 = 'Course2:  ' + infos["c1"];
                var c3 = 'Course3:  ' + infos["c2"];
            
                $('#c1').text(c1);
                $('#c2').text(c2);
                $('#c3').text(c3);              
            }           
        }
    });    
}

function submit_class() {
    $('#course_error').text('');
    
    const element =  document.querySelector('.submit-profile4');
    element.classList.add('animated', 'rubberBand');
    const daer = Server.docontent;
    const id = daer[0];
    const cl1 = $('#cl1').val();
    const cl2 = $('#cl2').val();
    const cl3 = $('#cl3').val();
    console.log(cl1,cl2,cl3);
    
    if (cl1.length != 8 || cl2.length != 8 || cl3.length != 8) {
        $('#course_error').text('* Sorry, your course code must 8 characters ');
        return
    }
    if (cl1 == cl2 || cl2 == cl3 || cl3 == cl1) {
        $('#course_error').text('* Sorry, your course code must be different ');
        return
    }
    
    var data = {"id":id, "course1":cl1, "course2":cl2, "course3":cl3};

    $.ajax({
        url: "/up_course",
        method: "POST",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        processData: false,
        // When success 
        success: 
            function (message) {
                console.log(message);
                
                if(message == '200') {
                    my_classes()
                    get_recent_questions()
                    upload_id()
                }
            }
    });        
}
function submit_class_t() {
    $('#course_error').text('');
    
    const element =  document.querySelector('.submit-profile4');
    element.classList.add('animated', 'rubberBand');
    const daer = Server.docontent;
    const id = daer[0];
    const cl1 = $('#cl1').val();
    const cl2 = $('#cl2').val();
    const cl3 = $('#cl3').val();
    console.log(cl1,cl2,cl3);
    
    if (cl1.length != 8 || cl2.length != 8 || cl3.length != 8) {
        $('#course_error').text('* Sorry, your course code must 8 characters ');
        return
    }
    if (cl1 == cl2 || cl2 == cl3 || cl3 == cl1) {
        $('#course_error').text('* Sorry, your course code must be different ');
        return
    }
    
    var data = {"id":id, "course1":cl1, "course2":cl2, "course3":cl3};

    $.ajax({
        url: "/up_course_t",
        method: "POST",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        processData: false,
        // When success 
        success: 
            function (message) {
                console.log(message);
                
                if(message == '200') {
                    my_classes_t()
                    question_satistics()
                    upload_id_t()
                }
            }
    });        
}
$(".submit-profile4").mouseout(function() {
	const element =  document.querySelector('.submit-profile4');
    element.classList.remove('animated', 'rubberBand');
})

// return4 返回4
function return4() {
    const page = document.querySelector('#recent_question');
    page.classList.add('animated', 'bounceInUp');
    
    document.getElementById("my_class").style.display="none";
    document.getElementById("recent_question").style.display="";
    
    $('#cl1').val('');
    $('#cl2').val('');
    $('#cl3').val('');
    $('#course_error').text('');
}



// Edit profile
function edit_profile() {
    const page = document.querySelector('#edit_profile');
    page.classList.add('animated', 'bounceInDown');
    
    document.getElementById("recent_question").style.display="none";
    document.getElementById("user_detail").style.display="none";
    document.getElementById("my_class").style.display="none";
    document.getElementById("about_us").style.display="none";
    document.getElementById("edit_profile").style.display="";
    
    $('#cl1').val('');
    $('#cl2').val('');
    $('#cl3').val('');
    $('#course_error').text('');
}

// return2 返回2
function return2() {
    const page = document.querySelector('#recent_question');
    page.classList.add('animated', 'bounceInUp');
    
    document.getElementById("edit_profile").style.display="none";
    document.getElementById("recent_question").style.display="";
    
    document.getElementById("new_email").style.display="none";
    document.getElementById("new_passwd").style.display="none";
    document.getElementById("new_name").style.display="none";
    
    document.getElementById("success").style.display="none";
	const elements =  document.querySelector('#success');
    elements.classList.remove('animated', 'fadeOut');
    
    $('#name_error').text('');
    $('#email_error').text('');
    $('#passwd_error_1').text('');
    $('#passwd_error_2').text('');
    
    $('#input_name').val('');
    $('#input_old_passwd').val('');
    $('#input_new_passwd').val('');
}

// About us
function our_info() {
    const page = document.querySelector('#about_us');
    page.classList.add('animated', 'bounceInDown');
    
    document.getElementById("recent_question").style.display="none";
    document.getElementById("my_class").style.display="none";
    document.getElementById("user_detail").style.display="none";
    document.getElementById("edit_profile").style.display="none";
    document.getElementById("about_us").style.display="";
    
    document.getElementById("new_email").style.display="none";
    document.getElementById("new_passwd").style.display="none";
    document.getElementById("new_name").style.display="none";
    document.getElementById("success").style.display="none";
    
    document.getElementById("success").style.display="none";
	const elements =  document.querySelector('#success');
    elements.classList.remove('animated', 'fadeOut');
    
    $('#cl1').val('');
    $('#cl2').val('');
    $('#cl3').val('');
    $('#course_error').text('');
    
    $('#name_error').text('');
    $('#email_error').text('');
    $('#passwd_error_1').text('');
    $('#passwd_error_2').text('');
    
    $('#input_name').val('');
    $('#input_email').val('');
    $('#input_old_passwd').val('');
    $('#input_new_passwd').val('');
}

// return3 返回3
function return3() {
    const page = document.querySelector('#recent_question');
    page.classList.add('animated', 'bounceInUp');
    
    document.getElementById("about_us").style.display="none";
    document.getElementById("recent_question").style.display="";
}

// Change info 
function change_name() {
    const page = document.querySelector('#new_name');
    page.classList.add('animated', 'fadeIn');
    
    document.getElementById("new_email").style.display="none";
    document.getElementById("new_passwd").style.display="none";
    document.getElementById("new_name").style.display="";
    
    document.getElementById("success").style.display="none";
	const elements =  document.querySelector('#success');
    elements.classList.remove('animated', 'fadeOut');
    
    $('#email_error').text('');
    $('#passwd_error_1').text('');
    $('#passwd_error_2').text('');
    
    $('#input_email').val('');
    $('#input_old_passwd').val('');
    $('#input_new_passwd').val('');
}
function change_email() {
    const page = document.querySelector('#new_email');
    page.classList.add('animated', 'fadeIn');
    
    document.getElementById("new_email").style.display="";
    document.getElementById("new_passwd").style.display="none";
    document.getElementById("new_name").style.display="none";
    
    document.getElementById("success").style.display="none";
	const elements =  document.querySelector('#success');
    elements.classList.remove('animated', 'fadeOut');
    
    $('#name_error').text('');
    $('#passwd_error_1').text('');
    $('#passwd_error_2').text('');
    
    $('#input_name').val('');
    $('#input_old_passwd').val('');
    $('#input_new_passwd').val('');
    
}
function change_passwd() {
    const page = document.querySelector('#new_passwd');
    page.classList.add('animated', 'fadeIn');
    
    document.getElementById("new_email").style.display="none";
    document.getElementById("new_passwd").style.display="";
    document.getElementById("new_name").style.display="none";
    
    document.getElementById("success").style.display="none";
	const elements =  document.querySelector('#success');
    elements.classList.remove('animated', 'fadeOut');
    
    $('#name_error').text('');
    $('#email_error').text('');
    
    $('#input_name').val('');
    $('#input_email').val('');
}

// Change name 改名字
function submit_name() {
    $('#name_error').text('');
    
    const element =  document.querySelector('.submit-profile1');
    element.classList.add('animated', 'rubberBand'); 
    const daer = Server.docontent;
    const id = daer[0]
    const new_name = $('#input_name').val();
    console.log(new_name);
    
    if (new_name == '') {
        const input =  document.querySelector('#input_name');
        input.classList.add('animated', 'shake'); 
        $('#name_error').text('* Your name could not be an empty value');
        return
    }
    
    var data = {"id":id, "name":new_name};

    $.ajax({
        url: "/name",
        method: "POST",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        processData: false,
        // When success 
        success: 
            function (message) {
                console.log(message);
                
                if(message == '200') {
                    success_page();
                }
            }
    }); 
}
// Change name teacher 改名字
function submit_name_t() {
    $('#name_error').text('');
    
    const element =  document.querySelector('.submit-profile1');
    element.classList.add('animated', 'rubberBand'); 
    const daer = Server.docontent;
    const id = daer[0]
    const new_name = $('#input_name').val();
    console.log(new_name);
    
    if (new_name == '') {
        const input =  document.querySelector('#input_name');
        input.classList.add('animated', 'shake'); 
        $('#name_error').text('* Your name could not be an empty value');
        return
    }
    
    var data = {"id":id, "name":new_name};

    $.ajax({
        url: "/name_t",
        method: "POST",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        processData: false,
        // When success 
        success: 
            function (message) {
                console.log(message);
                
                if(message == '200') {
                    success_page();
                }
            }
    }); 
}
$(".submit-profile1").mouseout(function() {
	const element =  document.querySelector('.submit-profile1');
    element.classList.remove('animated', 'rubberBand');
})
$(".submit-profile1").mouseout(function() {
	const input =  document.querySelector('#input_name');
    input.classList.remove('animated', 'shake');
})

// Change email 改邮箱
function submit_email() {
    $('#email_error').text('');
    
    const element =  document.querySelector('.submit-profile2');
    element.classList.add('animated', 'rubberBand');
    const daer = Server.docontent;
    const id = daer[0];
    const new_email = $('#input_email').val();
    console.log(new_email);
    
     if (new_email == '') {
        const input =  document.querySelector('#input_email');
        input.classList.add('animated', 'shake'); 
        $('#email_error').text('* Your email could not be an empty value');
        return
    }
    if (new_email.length < 4 || new_email.length > 64) {
        const input =  document.querySelector('#input_email');
        input.classList.add('animated', 'shake'); 
        $('#email_error').text('* Email must with 4 to 64 characters long');
        return
    }
    
    var data = {"id":id, "email":new_email};

    $.ajax({
        url: "/email",
        method: "POST",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        processData: false,
        // When success 
        success: 
            function (message) {
                console.log(message);
                
                if(message == '200') {
                    success_page();
                }
            }
    });    
}
// Change email 改邮箱
function submit_email_t() {
    $('#email_error').text('');
    
    const element =  document.querySelector('.submit-profile2');
    element.classList.add('animated', 'rubberBand');
    const daer = Server.docontent;
    const id = daer[0];
    const new_email = $('#input_email').val();
    console.log(new_email);
    
     if (new_email == '') {
        const input =  document.querySelector('#input_email');
        input.classList.add('animated', 'shake'); 
        $('#email_error').text('* Your email could not be an empty value');
        return
    }
    if (new_email.length < 4 || new_email.length > 64) {
        const input =  document.querySelector('#input_email');
        input.classList.add('animated', 'shake'); 
        $('#email_error').text('* Email must with 4 to 64 characters long');
        return
    }
    
    var data = {"id":id, "email":new_email};

    $.ajax({
        url: "/email_t",
        method: "POST",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        processData: false,
        // When success 
        success: 
            function (message) {
                console.log(message);
                
                if(message == '200') {
                    success_page();
                }
            }
    });    
}
$(".submit-profile2").mouseout(function() {
	const element =  document.querySelector('.submit-profile2');
    element.classList.remove('animated', 'rubberBand');
})
$(".submit-profile2").mouseout(function() {
	const input =  document.querySelector('#input_email');
    input.classList.remove('animated', 'shake');
})

// Change password 改密码
function submit_passwd() {  
    $('#passwd_error_1').text('');
    $('#passwd_error_2').text('');
    
    const element =  document.querySelector('.submit-profile3');
    element.classList.add('animated', 'rubberBand');
    const daer = Server.docontent;
    const id = daer[0];
    const old_passwd = $('#input_old_passwd').val();
    const new_passwd = $('#input_new_passwd').val();
    
    if (old_passwd == '' && new_passwd == '') {
        const input1 =  document.querySelector('#input_old_passwd');
        input1.classList.add('animated', 'shake'); 
        const input2 =  document.querySelector('#input_new_passwd');
        input2.classList.add('animated', 'shake'); 
        $('#passwd_error_1').text('* Old password could not be an empty value');
        $('#passwd_error_2').text('* New password could not be an empty value');
        return
    }
    else if (old_passwd == '') {
        const input1 =  document.querySelector('#input_old_passwd');
        input1.classList.add('animated', 'shake'); 
        $('#passwd_error_1').text('* Old password could not be an empty value');
        return
    }
    else if (new_passwd == '') {
        const input2 =  document.querySelector('#input_new_passwd');
        input2.classList.add('animated', 'shake'); 
        $('#passwd_error_2').text('* Old password could not be an empty value');
        return
    }
    
    if ((old_passwd.length < 8 || old_passwd.length > 16) && (new_passwd.length < 8 || new_passwd.length > 16)) {
        const input1 =  document.querySelector('#input_old_passwd');
        input1.classList.add('animated', 'shake'); 
        const input2 =  document.querySelector('#input_new_passwd');
        input2.classList.add('animated', 'shake'); 
        $('#passwd_error_1').text('* Password must with 8 to 16 characters long');
        $('#passwd_error_2').text('* Password must with 8 to 16 characters long');
        return
    }
    else if (old_passwd.length < 8 || old_passwd.length > 16) {
        const input1 =  document.querySelector('#input_old_passwd');
        input1.classList.add('animated', 'shake'); 
        $('#passwd_error_1').text('* Password must with 8 to 16 characters long');
        return
    }
    else if (new_passwd.length < 8 || new_passwd.length > 16) {
        const input2 =  document.querySelector('#input_new_passwd');
        input2.classList.add('animated', 'shake'); 
        $('#passwd_error_2').text('* Password must with 8 to 16 characters long');
        return
    }
    
    var data = {"id":id, "old_passwd":old_passwd, "new_passwd":new_passwd};

    $.ajax({
        url: "/password",
        method: "POST",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        processData: false,
        // When success 
        success: 
            function (message) {
                console.log(message);
                
                if(message == '300') {
                    const input1 =  document.querySelector('#input_old_passwd');
                    input1.classList.add('animated', 'shake'); 
                    $('#passwd_error_1').text('* Password is incorrect, please try again');
                    return
                }
                if(message == '200') {
                    success_page();
                }
            }
    });    
}
// Change password 改密码
function submit_passwd_t() {  
    $('#passwd_error_1').text('');
    $('#passwd_error_2').text('');
    
    const element =  document.querySelector('.submit-profile3');
    element.classList.add('animated', 'rubberBand');
    const daer = Server.docontent;
    const id = daer[0];
    const old_passwd = $('#input_old_passwd').val();
    const new_passwd = $('#input_new_passwd').val();
    
    if (old_passwd == '' && new_passwd == '') {
        const input1 =  document.querySelector('#input_old_passwd');
        input1.classList.add('animated', 'shake'); 
        const input2 =  document.querySelector('#input_new_passwd');
        input2.classList.add('animated', 'shake'); 
        $('#passwd_error_1').text('* Old password could not be an empty value');
        $('#passwd_error_2').text('* New password could not be an empty value');
        return
    }
    else if (old_passwd == '') {
        const input1 =  document.querySelector('#input_old_passwd');
        input1.classList.add('animated', 'shake'); 
        $('#passwd_error_1').text('* Old password could not be an empty value');
        return
    }
    else if (new_passwd == '') {
        const input2 =  document.querySelector('#input_new_passwd');
        input2.classList.add('animated', 'shake'); 
        $('#passwd_error_2').text('* Old password could not be an empty value');
        return
    }
    
    if ((old_passwd.length < 8 || old_passwd.length > 16) && (new_passwd.length < 8 || new_passwd.length > 16)) {
        const input1 =  document.querySelector('#input_old_passwd');
        input1.classList.add('animated', 'shake'); 
        const input2 =  document.querySelector('#input_new_passwd');
        input2.classList.add('animated', 'shake'); 
        $('#passwd_error_1').text('* Password must with 8 to 16 characters long');
        $('#passwd_error_2').text('* Password must with 8 to 16 characters long');
        return
    }
    else if (old_passwd.length < 8 || old_passwd.length > 16) {
        const input1 =  document.querySelector('#input_old_passwd');
        input1.classList.add('animated', 'shake'); 
        $('#passwd_error_1').text('* Password must with 8 to 16 characters long');
        return
    }
    else if (new_passwd.length < 8 || new_passwd.length > 16) {
        const input2 =  document.querySelector('#input_new_passwd');
        input2.classList.add('animated', 'shake'); 
        $('#passwd_error_2').text('* Password must with 8 to 16 characters long');
        return
    }
    
    var data = {"id":id, "old_passwd":old_passwd, "new_passwd":new_passwd};

    $.ajax({
        url: "/password_t",
        method: "POST",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        processData: false,
        // When success 
        success: 
            function (message) {
                console.log(message);
                
                if(message == '300') {
                    const input1 =  document.querySelector('#input_old_passwd');
                    input1.classList.add('animated', 'shake'); 
                    $('#passwd_error_1').text('* Password is incorrect, please try again');
                    return
                }
                if(message == '200') {
                    success_page();
                }
            }
    });    
}
$(".submit-profile3").mouseout(function() {
	const element =  document.querySelector('.submit-profile3');
    element.classList.remove('animated', 'rubberBand');
})
$(".submit-profile3").mouseout(function() {
	const input1 =  document.querySelector('#input_old_passwd');
    input1.classList.remove('animated', 'shake');
    const input2 =  document.querySelector('#input_new_passwd');
    input2.classList.remove('animated', 'shake');
})

// Success 成功界面
function success_page() {
    document.getElementById("success").style.display="";
    document.getElementById("new_email").style.display="none";
    document.getElementById("new_passwd").style.display="none";
    document.getElementById("new_name").style.display="none";
    
    $('#input_name').val('');
    $('#input_email').val('');
    $('#input_old_passwd').val('');
    $('#input_new_passwd').val('');
    
    $('#passwd_error_1').text('');
    $('#passwd_error_2').text(''); 
    
    const page = document.querySelector('#success');
    page.classList.add('animated', 'fadeOut');
}

// Logout 注销
function logout() {
//    window.location.href="http://127.0.0.1:5000";
    location.replace(location.href);
}
    
// Picture switch of main page 首页图片切换
function switchShow() {
    // Get each pictures 提取每张图片
    var images = document.getElementById("images");
    each_image = images.getElementsByTagName("img");
    current = 0; 
    
    // Pictures show and off 图片显示，淡出开关
    function switchOff() {
        each_image[current].className=""; 
    }
    function switchOn() {
        each_image[current].className="active"; 
    }
    
    // change pictures each 4s, and go back to first picture when in last picture
    // 每隔4s自动切换图片，到最后一张时自动回第一张
    function changeSwitch() { 
        switchOff(); 
        current++; 
        if (current > 1) {
            current = 0;
        }
        switchOn();
    }
    switch_time = setInterval(changeSwitch,10000);
    
    images.onmouseover = function () {
        clearInterval(switch_time); 
    }
    images.onmouseout = function () {
        switch_time = setInterval(changeSwitch, 10000); 
    }
}


// Modify the textarea model of ENTER key
// 更改textarea设定
function checkEnter(e){
    // use 'ENTER + Ctrl' key to \n
    if(e.keyCode == 13 && e.ctrlKey) {
        document.getElementById("input_message").value += "\n";
    } 
    // use 'ENTER' key to submit
    else if(e.keyCode == 13) {
        e.preventDefault();
        $("#submit").trigger("click");
    }
}


// url to link 把url显示成link形式
function urlToLink(str) {
    var re = /(http|ftp|https):\/\/[\w-]+(.[\w-]+)+([\w-.,@?^=%&:/~+#]*[\w-\@?^=%&/~+#])?/g;

    str = str.replace(re, function(website){ 
        return "<a href='" + website +"' target='_blank'>" + website + "</a>"; 
    }); 
    return str;
}


// Function part 鼠标单击事件
$(function() {
     $(".setting").click(function() {
         const element =  document.querySelector('.menu');
         element.classList.add('animated', 'fadeIn');
		 $(this).children("ul").show(); 	 
	 })
    $(".setting").mouseout(function() {
		 $(this).children("ul").hide(); 	 
	 })
    $(".menu").mouseover(function() {
         const element =  document.querySelector('.menu');
         element.classList.add('animated', 'fadeIn');
		 $(".menu").show();
	 })
    $(".menu").mouseout(function() {
		 $(".menu").hide();
	 })
}) 


// Get Help 帮助文件
function get_help() {
    const element =  document.querySelector('.help');
    element.classList.add('animated', 'rubberBand');
    $( "#help" ).remove();
    // Help menu 帮助菜单
    var data = `<div class="chat-message-bot">Please choose which type of questions you want to ask: 
                <div class="help-info" onclick="help_info1()">1.  About the course information on the handbook.</div>
                <div class="help-info" onclick="help_info2()">2.  About the course recommendation.</div>
                <div class="help-info" onclick="help_info3()">3.  About the Q&A.</div>
                <div class="help-info" onclick="help_info4()">4.  About the uploading pictures.</div>
                </div>`;
    $('.chat-container').append(data);
    // Scroll page 下拉页面
    var scrollDiv = $('#chat_container');
    scrollDiv.scrollTop(scrollDiv[0].scrollHeight);
}
function get_help_t() {
    const element =  document.querySelector('.help');
    element.classList.add('animated', 'rubberBand');
    $( "#help" ).remove();
    // Help menu 帮助菜单
    var data = `<div class="chat-message-bot">Please choose which type of questions you want to ask: 
                <div class="help-info" onclick="help_info1()">1.  About the course information on the handbook.</div>
                <div class="help-info" onclick="help_info33()">2.  About the Q&A.</div>
                <div class="help-info" onclick="help_info4()">3.  About the uploading pictures.</div>
                </div>`;
    $('.chat-container').append(data);
    // Scroll page 下拉页面
    var scrollDiv = $('#chat_container');
    scrollDiv.scrollTop(scrollDiv[0].scrollHeight);
}

$(".help").mouseout(function() {
	const element =  document.querySelector('.help');
    element.classList.remove('animated', 'rubberBand');
})

function help_info1() {
    $( "#help" ).remove();
    var data = `<div class="chat-message-bot" id="help">About the course information on the handbook:
(1) Name of the course:
	eg. Tell me the name of comp9331.
	eg. I want to know the course name of COMP9517.
(2) Details of the course:
	eg. Tell me detail of COMP9517 and COMP9444.
	eg. More information about comp9334.
(3) Semester of the course:
	eg. Which semester offers COMP9900?
	eg. Could you please tell me the timetable of COMP9334, COMP9900?
(4) Lecturer of the course:
	eg. Can I know the professor of comp7312 of term 1?
	eg. Who is the teacher of comp6714?
                </div>`;
    $('.chat-container').append(data);
    // Scroll page 下拉页面
    var scrollDiv = $('#chat_container');
    scrollDiv.scrollTop(scrollDiv[0].scrollHeight);
}


function help_info2() {
    $( "#help" ).remove();
    var data = `<div class="chat-message-bot" id="help">About the course recommendation:
(1) Courses can be recommended based on semester or knowledge:
	eg. Could you please tell me some courses about deep learning?
	eg. Could you please recommend some courses related to 3D games during T1?
	eg. What course I can choose during the first semester？
                </div>`;
    $('.chat-container').append(data);
    // Scroll page 下拉页面
    var scrollDiv = $('#chat_container');
    scrollDiv.scrollTop(scrollDiv[0].scrollHeight);
}


function help_info3() {
    $( "#help" ).remove();
    var data = `<div class="chat-message-bot" id="help">About Q&A:
(1) I can answer your question:
    i. Student can start a question from ‘I want to ask a question’.
	ii. Student can ask question directly and based on the chatbot's response.
(2) Upload the question and wait for the teacher to answer:
	eg. Give the corresponding response according to the instructions.
                </div>`;
    $('.chat-container').append(data);
    // Scroll page 下拉页面
    var scrollDiv = $('#chat_container');
    scrollDiv.scrollTop(scrollDiv[0].scrollHeight);
}

function help_info33() {
    $( "#help" ).remove();
    var data = `<div class="chat-message-bot" id="help">About Q&A:
(1) Staff can look up question asked by student:
	eg. Show me the question list.
	eg. Can I have the questions on forum.
(2) Staff can Choosing the questions, and after shown questions, staff can directly choose questions to answer:
	eg. Q1(if you want to answer the first question).
	eg. Answer the question Q5678.
(3) How to Answer the question:
    i. Type the answers to chatbot after choosing questions,the answers will saved to database and shown on student systems.
                </div>`;
    $('.chat-container').append(data);
    // Scroll page 下拉页面
    var scrollDiv = $('#chat_container');
    scrollDiv.scrollTop(scrollDiv[0].scrollHeight);
}

function help_info4() {
    $( "#help" ).remove();
    var data = `<div class="chat-message-bot" id="help">Uploading pictures:
(1) You can ask me questions by uploading pictures, I will read the questions in the pictures.
                </div>`;
    $('.chat-container').append(data);
    // Scroll page 下拉页面
    var scrollDiv = $('#chat_container');
    scrollDiv.scrollTop(scrollDiv[0].scrollHeight);
}



// ####################### Main function part #######################


// Picture indentify 图片识别功能

// Upload pictures 图片上传
function select_file(){
    const element =  document.querySelector('.pic');
    element.classList.add('animated', 'rubberBand');
    $("#image").trigger("click");
}

$(".pic").mouseout(function() {
	const element =  document.querySelector('.pic');
    element.classList.remove('animated', 'rubberBand');
})

$("#image").on("change", function(e){
   const daer = Server.docontent;
   const id = daer[0];
   const info = daer[3];

   var data = {"id":id, "info":info};

   $.ajax({
   url: "/upload_id",
   method: "POST",
   data: JSON.stringify(data),
   contentType: "application/json; charset=utf-8",
   dataType: "json",
   processData: false,
   // When success
   success:
        function (infos) {
           // Get picture 获取图片资源
          var tmp_img = e.target.files[0];
          var reader = new FileReader();

          // Read picture 读取图片
          reader.readAsDataURL(tmp_img);
          reader.onload = function(arg) {
              // Modify picture 渲染图片
              var img = '<img class="preview" src="' + arg.target.result + '" alt="preview"/>';
              $('.chat-container').append(`<div class="chat-message-pic">${img}</div>`);

              // Upload infomation 加载内容
              $('.chat-container').append(`<div class="chat-message-bot" id="loading"> I am trying to identify the picture, please wait a moment ... </div>`)

              // Scroll page 下拉页面
              var scrollDiv = $('#chat_container');
              scrollDiv.scrollTop(scrollDiv[0].scrollHeight);

              submit_picture(tmp_img);
          }
          document.getElementById('image').value = null;
         }
    });
});

// Submit pictures 提交图片 
function submit_picture(tmp_img) {
    // Use formdata to save the picture 用表单储存图片
    var formData = new FormData();
    formData.append('file', tmp_img);

    // Use ajax upload picture 上传图片
    $.ajax({
        url: "/photo",
        method: "POST",
        data: formData,
        processData: false,
        contentType: false,
        // When success 
        success: 
            function (message) {
                // If can not identify picture 
                if (message == '') {
                    $('.chat-container').append(`<div class="chat-message-bot">Sorry, I can't find any information from your picture, please try again. </div>`);
                    // Canel loading 移除加载
                    $( "#loading" ).remove();
                    // Scroll page 下拉页面
                    var scrollDiv = $('#chat_container');
                    scrollDiv.scrollTop(scrollDiv[0].scrollHeight);
                }
                else{
                    console.log(message)
                    // Return infomation 加入返回内容
                    $('.chat-container').append(`<div class="chat-message-bot">I guess your mean is "${urlToLink(message)}" </div>`);
                    // Canel loading 移除加载
                    $( "#loading" ).remove();
                    // Add information to chat-box 加载新内容
                    $('.chat-container').append(`<div class="chat-message-bot" id="loading"> I am searching, please wait a moment ... </div>`);       
                    // Scroll page 下拉页面
                    var scrollDiv = $('#chat_container');
                    scrollDiv.scrollTop(scrollDiv[0].scrollHeight);    
                    // submit info to dialogflow 发送
                    submit_message(message); 
                }
            }
    });
}


// Submit message 提交文字信息

// submit 按钮操作
$('#target').on('submit', function(e){
    const element =  document.querySelector('.submit');
    element.classList.add('animated', 'rubberBand');
    e.preventDefault();        
    var input_message = urlToLink($('#input_message').val());
    console.log(input_message);

    const daer = Server.docontent;
    const id = daer[0];
    const info = daer[3];

    var data = {"id":id, "info":info};

    // if no message or all are apace then return
    // 无内容或者全是空格则返回
    var p = new RegExp(/^\s+$/g);
    if (!input_message || p.test(input_message)) {
        return
     }

     $('.chat-container').append(`<div class="chat-message-human">${input_message}</div>`)
     if (input_message.length > 255) {
        input_message = input_message.slice(0,254)
     }
     // Upload infomation 加载内容
     $('.chat-container').append(`<div class="chat-message-bot" id="loading"> I am searching, please wait a moment ... </div>`)
     // Clear message 清除输入内容
     $('#input_message').val('')
     // Scroll page 下拉页面
     var scrollDiv = $('#chat_container');
     scrollDiv.scrollTop(scrollDiv[0].scrollHeight);
     // submit info to dialogflow 发送

    $.ajax({
    url: "/upload_id",
    method: "POST",
    data: JSON.stringify(data),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    processData: false,
    // When success
    success:
        function (infos) {
            submit_message(input_message);
         }
    });
});

// Receive message from dialogflow 接收信息
function submit_message(message) {
    // Send to backend dialogflow
    $.post( "/send_message", {message: message}, handle_response);

    function handle_response(data) {
        console.log(data.message)
        // Return infomation 加入返回内容
        $('.chat-container').append(`<div class="chat-message-bot">${urlToLink(data.message)}</div>`)
        // Canel loading 移除加载
        $( "#loading" ).remove();
        // Scroll page 下拉页面
        var scrollDiv = $('#chat_container');
        scrollDiv.scrollTop(scrollDiv[0].scrollHeight);
    }
}
$(".submit").mouseout(function() {
	const element =  document.querySelector('.submit');
    element.classList.remove('animated', 'rubberBand');
})


function say_hello() {
    const daer = Server.docontent;
    const name = daer[1];
    
    $('.chat-container').append(`<div class="chat-message-bot">Hi ${name}!   How can I help you? </div>`);
}

function upload_id() {
    const daer = Server.docontent;
    const id = daer[0];
    const info = daer[3];
    
    var data = {"id":id, "info":info};
    
    $.ajax({
        url: "/upload_id",
        method: "POST",
        data: JSON.stringify(data),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        processData: false
    });
}
