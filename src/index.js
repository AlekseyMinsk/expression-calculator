function expressionCalculator(expr) {
	expr = expr.replace(/\s/g, '');
	var brackets = expr.replace(/[0-9!-'*-.\\\/]/g, "").split('');
	var bracketsArr = [];
	var error = false;
	for(var i = 0; i < brackets.length; i++) {
		if(bracketsArr.length === 0 && brackets[i] === ")") {
			error = true;
			break;
		} 
		if(bracketsArr.length === 0 || brackets[i] === "("){
			bracketsArr.push(brackets[i]);
			continue;
		} 
		if(brackets[i] === ")" && bracketsArr[bracketsArr.length - 1] === "(") {
			bracketsArr.pop();
			continue;
		}
	}
	if(error || bracketsArr.length) {
		throw new Error('ExpressionError: Brackets must be paired');
	}
	arr = expr.split("");
	
    var numberArr = [];
    var number = "";
    arr.forEach((i, index) => {
        if(!Number.isNaN(+i)) {
            number += i;
            if(index === arr.length -1) {
                numberArr.push(+number)
            }
        } else {
            if(number) {
                numberArr.push(+number);
                number = "";
            }
            numberArr.push(i)
        }
    })
    //console.log(numberArr);
    

    while(numberArr.length > 1) {
        var close = numberArr.indexOf(")");
        var open = numberArr.lastIndexOf("(",close);

        if(close === -1) {
            numberArr = count(numberArr);
            break;
        } else {   
            var currentArr =  numberArr.slice(open + 1, close);
            currentArr = count(currentArr)[0];
            numberArr.splice(open, close-open+1, currentArr);
            continue;
        }
            
    }
    return numberArr[0];
}

function count(arr) {
    function lastCount(a, b, symbol) {
        switch (symbol) {
          case "*":
            return a*b;
            break;
          case "/":
            if(b === 0) {
                return false;
            } else {
                return a/b;
            }
            break;
          case "+":
            return a+b;
            break;
          case "-":
            return a-b;
            break;
        }
    }
    while(arr.length  > 1) {
        var del = arr.indexOf("/");
        var mul = arr.indexOf("*");
        if(del > 0 || mul > 0) {
            for(var i = 0; i < arr.length; i++) {
                if(arr[i] === "*" || arr[i] === "/") {
                    var number = lastCount(arr[i-1], arr[i+1], arr[i]);
                    if(number === false) {
                        throw new Error('TypeError: Division by zero.');
                    }
                    arr.splice(i-1, 3, number);
                    break;
                }
            }
            continue;
        } else {
            for(var i = 0; i < arr.length; i++) {
                if(arr[i] === "-" || arr[i] === "+") {
                    var number = lastCount(arr[i-1], arr[i+1], arr[i]);
                    arr.splice(i-1, 3, number);
                    break;
                }
            }
            continue;
        }        
    }
    return arr;
}

module.exports = {
    expressionCalculator
}













// function eval() {
//     return;
// }

// function count2(arr) {
//  while(arr.length > 1) {
//         var del = arr.indexOf("/");
//         var mul = arr.indexOf("*");

//         if(del > -1) {
//          console.log("test5");
//          break;
//             if((mul> -1) && mul < del) {
//                 count = arr[mul - 1] * arr[mul + 1];
//                 arr.splice(mul - 1, 3, count);    
//                 continue;  
//             } else {
//              if(arr[del + 1] === "0") {
//                  console.log("test");
//                  throw new Error('TypeError: Devision by zero.');
//                  break;
//                  return;
//              }
//                 count = arr[del -1] / arr[del + 1];
//                 arr.splice(del - 1, 3, count);
//                 continue; 
//             }
//             console.log("test6");
//         } if(mul> -1){
//             count = arr[mul - 1] * arr[mul + 1];
//             arr.splice(mul - 1, 3, count);    
//             continue;  
        
//         } 
//        // console.log("test10")
//         var del = arr.indexOf("-");
//         var mul = arr.indexOf("+");

//         if(del > -1) {
//             if((mul> -1) && mul < del) {
//                 count = +arr[mul - 1] + +arr[mul + 1];
//                 arr.splice(mul - 1, 3, count);    
//                 continue;  
//             } else {
//                 count = +arr[del -1] - +arr[del + 1];
//                 arr.splice(del - 1, 3, count);
//                 continue; 
//             }
            
            
//         } if(mul> -1){
//             count = +arr[mul - 1] + +arr[mul + 1];
//             arr.splice(mul - 1, 3, count);    
//             continue;  
        
//         }   
//     }
//     return arr;
// }