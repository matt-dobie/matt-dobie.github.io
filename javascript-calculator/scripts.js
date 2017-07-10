$(document).ready(function() {

  var val;
  var current = "";
  var expression = "";
  var previous = "";
  var answer = 0;
  var canOperate = false;
  var decimal = false;
  var negative = false;
  var evaluated = true;

  // Round function
  var round = function(val) {
    val = String(Math.round(val * 10000000000) / 10000000000);
    return val.slice(0, 8);
  };

  // Function to update the display
  var update = function(disp, hist) {
    if (disp === "") {
      $("#answer").html("0");
    } else {
      $("#answer").html(disp);
    }

    if (hist === "") {
      $("#history").html("0");
    } else {
      $("#history").html(hist);
    }
  };

  // Reset function
  var reset = function() {
    decimal = false;
    negative = false;
    canOperate = false;
    current = "";
    expression = "";
  };

  // Calculate function
  var calculate = function(str) {
    str = str.replace(/x/g, "*");
    str = str.replace(/&divide;/g, "/");
    console.log(str);
    return round(eval(str));
  };

  // When any button is clicked
  $("button").click(function() {

    val = $(this).attr("value");

    // Clear all
    if (val === "ac") {
      evaluated = false;
      reset();
      update(current, expression);
      previous = "0";
    }

    // Clear last entry
    if (val === "ce") {
      if (!evaluated) {
        reset();
        expression = previous;
      } else {
        canOperate = true;
      }
      update(current, expression);
    }

    // 0
    if (val === "0" ) {
      if (current !== "0" && !evaluated) {
        current += val;
        expression += val;
      }
      else if (evaluated) {
        current = val;
        expression = val;
        evaluated = false;
      }
      
      update(current, expression);
      canOperate = true;
    }

    // Digits 1-9
    if (Number(val)) {
      if (!evaluated) {
        if (canOperate || expression[expression.length-1] === "." || negative) {
          current += val;
        } else {
          current = val;
        }
        if (expression === "0") {
          current = val;
          expression = val;
        } else {
          expression += val;
        }
    
      } else {
        current = val;
        expression = val;
        evaluated = false;
      }

      update(current, expression);
      canOperate = true;
    }

    // Decimals
    if (val === "." && !decimal) {
      if (evaluated) {
        current = "0.";
        expression = "0.";
      } else {
        if (!canOperate) {
          current = "0.";
          expression += "0.";
        } else {
          current += val;
          expression += val;
        }
      }

      decimal = true;
      negative = true;
      canOperate = false;
      evaluated = false;
      update(current, expression);
    }

    // Operations
    if (val === "+" && canOperate) {
      canOperate = false;
      evaluated = false;
      decimal = false;
      negative = false;
      current = val;
      expression += val;
      update(current, expression);
      current = "";
      previous = expression;
    }

    if (val === "-") {

      if (canOperate) {
        canOperate = false;
        evaluated = false;
        decimal = false;
        current = val;
        expression += val;
        update(current, expression);
        current = "";
        previous = expression;
      }
      else if (!negative) {
        evaluated = false;
        decimal = false;
        negative = true;
        current = val;
        expression += val;
        update(current, expression);
        
      }
      
    }

    if (val === "*" && canOperate) {
      canOperate = false;
      evaluated = false;
      decimal = false;
      negative = false;
      current = "x";
      expression += "x";
      update(current, expression);
      current = "";
      previous = expression;
    }

    if (val === "/" && canOperate) {
      canOperate = false;
      evaluated = false;
      decimal = false;
      negative = false;
      current = "&divide;";
      expression += "&divide;";
      update(current, expression);
      current = "";
      previous = expression;
    }


    // Evaluate
    if (val === "=" && canOperate) {
      console.log(expression);
      answer = calculate(expression);
      if (answer < 0) {
        negative = true;
      }
      current = answer;
      expression += "=" + answer;
      update(current, expression);
      evaluated = true;
      decimal = false;
      expression = answer;
      previous = answer;
    }

    // Max digits on screen
    if ($('#answer').text().length > 8 || $('#history').text().length > 22) {
      update('0', 'Digit limit exceeded');
      evaluated = false;
      reset();
    }

  });
});
