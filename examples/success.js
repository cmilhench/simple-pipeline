
var pipeline = require('../');
var actions = require('./actions');

var goodPipe = pipeline()
	.use(actions.step1)
	.use(actions.step2)
	.use(actions.step3)
	.execute({ data: 'GO' }, function(err, context){
		if(err) {
			console.log('Error: %s', err);
		}
		console.log('Complete: %s', context.data);
	});

//	Output:
//  Executing step 1 GO
//  Executing step 2 GO
//  Executing step 3 OK
//  Complete AOK!