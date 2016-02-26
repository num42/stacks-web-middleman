//= require jquery
//= require_tree .

function init_feedback_form() {
  $("#feedback_button").click(function(){
    $("#error_message").hide();

    var formArray = $("#feedback_form").serializeArray();
    var form_invalid = false;

    $.each(formArray, function(i, v) {
      if(v.name === "email") {
        if (v.value === ""){
          $(".feedback-email").addClass("invalid");
          form_invalid = true;
        } else {
          $(".feedback-email").removeClass("invalid");
        }
      }

      if(v.name === "message") {
        if (v.value === ""){
          $(".feedback-message").addClass("invalid");
          form_invalid = true;
        } else {
          $(".feedback-message").removeClass("invalid");
        }
      }

      if(v.name === "realname") {
        if (v.value === ""){
          $(".feedback-name").addClass("invalid");
          form_invalid = true;
        } else {
          $(".feedback-name").removeClass("invalid");
        }
      }
    });

    var form_valid = !form_invalid;
    if(form_valid) {
      $.post("/system-cgi/formmail.pl", $("#feedback_form").serialize()).done(function() {
        $("#thank_you_message").show();
        $("#feedback_form").hide();
        $("#feedback_button").hide();
      }).fail(function() {
        $("#error_message").show();
      });
    }
  });
}

function init_contact_form() {
  $("#contact_button").click(function(){
    $("#error_message").hide();

    var formArray = $("#contact_form").serializeArray();
    var form_invalid = false;

    $.each(formArray, function(i, v) {
      if(v.name === "email") {
        if (v.value === ""){
          $(".contact-email").addClass("invalid");
          form_invalid = true;
        } else {
          $(".contact-email").removeClass("invalid");
        }
      }

      if(v.name === "message") {
        if (v.value === ""){
          $(".contact-message").addClass("invalid");
          form_invalid = true;
        } else {
          $(".contact-message").removeClass("invalid");
        }
      }

      if(v.name === "realname") {
        if (v.value === ""){
          $(".contact-name").addClass("invalid");
          form_invalid = true;
        } else {
          $(".contact-name").removeClass("invalid");
        }
      }
    });

    var form_valid = !form_invalid;
    if(form_valid) {
      $.post("/system-cgi/formmail.pl", $("#contact_form").serialize()).done(function() {
        $("#thank_you_message").show();
        $("#contact_form").hide();
        $("#contact_button").hide();
      }).fail(function() {
        $("#error_message").show();
      });
    }
  });
}

function bindEvent(element, type, handler) {
   if(element.addEventListener) {
      element.addEventListener(type, handler, false);
   } else {
      element.attachEvent('on'+type, handler);
   }
}

bindEvent(window, "load", init_contact_form);
