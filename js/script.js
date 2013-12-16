// JavaScript Document
(function($){
	var input = [], 
		operators = [], 
		equation = [],
		currentInput = 0,
		currentOp = 0,
		result = 0;
	
	$(document).ready(function(e) {
		//Selectors
		var $result = $('#result'),
			$calculator = $('#calculator');
		
		//$result.html(input.toString());
		//////////////////////////////////
		// Input Click
        $calculator.on('click', '[data-action=input]', function(e){
			var $this = $(this);
			e.preventDefault();
			if(($result.html() == '0') || (parseInt($result.html()) > 0)){
				$result.html('');
				input.push(parseInt($this.html()));
				$result.html(input[input.length -1].toString());	
			} else {
				input[input.length -1] = parseInt(input[input.length -1] + $this.html());
				$result.html(input[input.length -1].toString());
			}
			//currentInput++;
			//$result.text(input.toString());
		});
		// end input click
		///////////////////////////////////////
		$calculator.on('click', '[data-action=op]', function(e){
			e.preventDefault();
			var $this = $(this);
			if($result.html() != '0'){
				var oper = getOp($this.data('type'));
					
					equation.push(input[input.length -1]);
					
					if(equation.length > 2){
						result = doMath(equation[equation.length - 3], equation[equation.length - 2], equation[equation.length - 1]);
						equation.push(result);
						input.push(result);
					} else {
						result = 0;
					}
					equation.push(oper);
					//equation.push(operators[currentOp]);
					
					$result.html(result.toString());
					
					
				
				console.log(equation);
			}
		});
		
		function getOp(op){
			var oper;
			switch (op){
				case 'times':
					oper = '*';
					break;	
				case 'plus':
					oper = '+';
					break;	
				case 'minus':
					oper = '-';
					break;	
				case 'divide':
					oper = '/';
					break;	
				case 'equals':
					oper = '=';
					break;	
			}
			
			
			return oper;
		}
		
		function doMath(x, op, y){
			//console.log(x + op + y);
			var result = 0;
			switch (op){
				case '*':
					result = x * y;
					break;	
				case '+':
					result = x + y;
					break;	
				case '-':
					result = x - y;
					break;	
				case '/':
					result = x / y;
					break;	
				case '=':
					result = x + y;
					break;	
			}
			return result;
		}
		
		
    });	
})(jQuery);