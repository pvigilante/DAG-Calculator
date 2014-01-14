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
			$ops = $('[data-action=op]');
		
		resetCalculator('0');
		//$result.html(input.toString());
		//////////////////////////////////
		// Input Click
        $calculator.on('click', '[data-action=input]', function(e){
			var $this = $(this);
			//e.preventDefault();
			
			if($result.data("fromPrevious") == true){
				resetCalculator($this.text());
			} else if(($result.data('isPendingFunction') == true) &&
						($result.data('valueOneLocked') == false)){
				$result.data('valueOne', $result.val());
				$result.data('valueOneLocked', true);
				$result.val($this.text());
				$result.data('valueTwo', $result.val());
				$result.data('valueTwoLocked', true);	
				console.log('hi');			
			} else if (($result.data('isPendingFunction') == true) &&
						($result.data('valueOneLocked') == true)) {
				var curValue = $result.val(),
					toAdd = $this.text(),
					newValue = curValue + toAdd; // *?
					
				$result.val(newValue);
				$result.data('valueTwo', $result.val());
				$result.data('valueTwoLocked', true);
					
			} else {
				var curValue = $result.val();
				if(curValue == '0'){
					curValue = '';	
				}
				
				var toAdd = $this.text(),
					newValue = curValue + toAdd;	
				$result.val(newValue);
				
			}
			//currentInput++;
			//$result.text(input.toString());
		});
		// end input click
		///////////////////////////////////////
		$calculator.on('click', '[data-action=op]', function(e){
			//e.preventDefault();
			var $this = $(this);
			
			
			if($result.data('fromPrevious') == true){
				resetCalculator($result.val());
				$result.data('valueOneLocked', false);
				$result.data('fromPrevious', false);
			}
			var pendingFunction = $this.data('type');
			
			$result.data('isPendingFunction', true);
			$result.data('thePendingFunction', pendingFunction);
			$ops.removeClass('pendingFunction');
			$this.addClass('pendingFunction');
		});
		
		$calculator.on('click', '[data-action=equals]', function(e){
			if(($result.data('valueOneLocked') == true) && ($result.data('valueTwoLocked') == true)){
				if($result.data('thePendingFunction') == 'plus'){
					var finalValue = parseFloat($result.data('valueOne')) + parseFloat($result.data('valueTwo'));
				}
				else if($result.data('thePendingFunction') == 'minus'){
					var finalValue = parseFloat($result.data('valueOne')) - parseFloat($result.data('valueTwo'));
				}
				else if($result.data('thePendingFunction') == 'times'){
					var finalValue = parseFloat($result.data('valueOne')) * parseFloat($result.data('valueTwo'));
				}
				else if($result.data('thePendingFunction') == 'divide'){
					var finalValue = parseFloat($result.data('valueOne')) / parseFloat($result.data('valueTwo'));
				}
				
				$result.val(finalValue);
				resetCaluculator(finalValue);
				$result.data('fromPrevious', true);
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
		
		function resetCalculator(curValue){
			$result.val(curValue);
			$ops.removeClass('pendingFunction');
			$result.data('isPendingFunction', false);
			$result.data('thePendingFunction', "");
			$result.data('valueOneLocked', false);
			$result.data('valueTwoLocked', false);
			$result.data('valueOne', curValue);
			$result.data('valueTwo', 0);
			$result.data('fromPrevious', false);
			
		}
		
		
    });	
})(jQuery);